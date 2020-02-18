import nlp from 'compromise'
import ngrams from 'compromise-ngrams'
import fmin from 'fmin'
import fs from 'fs'

const nlpEx  = nlp.extend(ngrams);


// Look at the frequency distribution of words within a document.
const frequency = (doc) => {
    return doc.unigrams().map(obj => obj.count);
}

// look at the length distributionof words within a document
const length = (doc) => {
    return doc.unigrams().map(obj => obj.normal.length);
}

export const nbd = (text, type) => {
    let doc = nlpEx(text);
    let data = [];
    switch(type) {
        case 'length':
            data = length(doc);
            break;
        case 'frequency':
            data = frequency(doc);
            break;
    }

    let t = doc.sentences().length;
    let word_count = doc.wordCount();

    let hist = compute_hist(data); // histogram basically, actuals[i] = # of words with frequency i
    let result = fmin.nelderMead(p_x_hist(hist, t), [1, 1], null);
    let r = result.x[0];
    let alpha = result.x[1];
    let ll = -result.fx;

    
    
    let expecteds = compute_expected(r, alpha, doc.unigrams().length, hist.length, t); // expecteds[i] = # of words with frequency i

    let {chisq, df} = CHISQ(hist, expecteds, 2);

    return {
        'r': r.toFixed(3), 
        'alpha': alpha.toFixed(3), 
        'll': ll.toFixed(3), 
        'data': data, 
        't': t.toFixed(3), 
        'word_count': word_count, 
        'chisq': chisq.toFixed(3), 
        'df': df,
        'actual': hist,
        'expected': expecteds,
        'unique_words': data.length,
    };
}

// assumes hist[0] is 0
let p_x_hist = (hist, t) => {
    return (X) => {
        let r = X[0];
        let alpha = X[1];
        let px = Math.pow((alpha / (alpha + t)), r)
        let ll = hist[1] ? Math.log(px) * hist[1] : 0;
        for (var x = 2; x < hist.length; x++) {
            px = px * t * (r+x-2) / ((x-1)*(alpha+t));
            ll += hist[x] ? Math.log(px) * hist[x] : 0;
        }
        return -ll;
    }
}

let p_x = (x, r, alpha, t) => {
    return Math.exp(LogGamma(r+x-1))/(factorial(x)*Math.exp(LogGamma(r)))*Math.pow(alpha/(alpha+t),r)*Math.pow(t/(alpha+t),x);
}

let LL = (p_x) => {
    return Math.log(p_x);
}

// X[0] = r, X[1] = alpha point wise
let MLE = (data, word_count) => {
    return (X) => {
        var r = X[0]
        var alpha = X[1];
        let loglikelihood = 0;
        for (var i = 0; i < data.length; i++) {
            loglikelihood += LL(p_x(data[i], r, alpha, word_count));
        }
        return -loglikelihood;
    }
}

let compute_hist = (data) => {
    let hist = [];
    for (var i = 0; i < data.length; i++) {
        hist[data[i]] = hist[data[i]] ? hist[data[i]] + 1 : 1;
    }
    return hist;
}

let compute_expected = (r, alpha, unique_words, length, t) => {
    let expecteds = [];
    let px = Math.pow((alpha / (alpha + t)), r)
    expecteds[1] = px * unique_words;
    for (var x = 2; x < length; x++) {
        px = px * t * (r+x-2) / ((x-1)*(alpha+t));
        expecteds[x] = px * unique_words;
    }
    return expecteds;
}

// right censors on first empty cell reached
let CHISQ = (actual, expected, num_params) => {
    if (actual.length != expected.length) return null;
    let val = 0;
    let i = 1;
    while (i < actual.length && actual[i]) {
        if (expected[i] > 0) {
            val += (actual[i] - expected[i]) * (actual[i] - expected[i]) / expected[i];
        }
        i++;
    }

    let right_censor_actual = 0;
    let right_censor_expected = 0;
    let df = i + 1 - num_params
    while (i < actual.length) {
        right_censor_actual += actual[i] ? actual[i] : 0;
        right_censor_expected += expected[i] ? expected[i] : 0;
        i++;
    }
    if (right_censor_actual && right_censor_expected) {
        val += (right_censor_actual - right_censor_expected) * (right_censor_actual - right_censor_expected) / right_censor_expected;
    }

    return {'chisq': chisquaredtest(val, df), 'df': df};
}

let chisquaredtest = (Z, DF) => {
	if (DF<=0) {
        alert("Degrees of freedom must be positive")
        return;
	} 
    let Chisqcdf=Gammacdf(Z/2,DF/2);
    return 1 - Math.round(Chisqcdf*100000)/100000;
}

// for graphing
export const graph_nbd = (r, alpha, t, word_count) => {
    return (x) => {
        return word_count * p_x(x, r, alpha, t)
    }
}

// Math functions below
// math for nbd
const g = 7;
const C = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

let gamma = (z) => {
    if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    else {
        z -= 1;
        var x = C[0];
        for (var i = 1; i < g + 2; i++)
        x += C[i] / (z + i);

        var t = z + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, (z + 0.5)) * Math.exp(-t) * x;
    }
}

let factorial = (n) => {
    return Math.exp(LogGamma(n + 1));
}
  


// math for chisq
function LogGamma(Z) {
    let log = Math.log;
	var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
	var LG= (Z-.5)*log(Z+4.5)-(Z+4.5)+log(S*2.50662827465);
	return LG
}

function Gcf(X,A) {        // Good for X>A+1
    let log = Math.log;
    let exp = Math.exp;
    let abs = Math.abs;
    var A0=0;
    var B0=1;
    var A1=1;
    var B1=X;
    var AOLD=0;
    var N=0;
    while (abs((A1-AOLD)/A1)>.00001) {
        AOLD=A1;
        N=N+1;
        A0=A1+(N-A)*A0;
        B0=B1+(N-A)*B0;
        A1=X*A0+N*A1;
        B1=X*B0+N*B1;
        A0=A0/B1;
        B0=B0/B1;
        A1=A1/B1;
        B1=1;
    }
    var Prob=exp(A*log(X)-X-LogGamma(A))*A1;
	return 1-Prob;
}

function Gser(X,A) {        // Good for X<A+1.
    let log = Math.log;
    let exp = Math.exp;
    var T9=1/A;
    var G=T9;
    var I=1;
    while (T9>G*.00001) {
        T9=T9*X/(A+I);
        G=G+T9;
        I=I+1;
    }
    G=G*exp(A*log(X)-X-LogGamma(A));
    return G
}

function Gammacdf(x,a) {
	var GI;
	if (x<=0) {
		GI=0
	} else if (x<a+1) {
		GI=Gser(x,a)
	} else {
		GI=Gcf(x,a)
	}
	return GI
}


