(this.webpackJsonpnbd=this.webpackJsonpnbd||[]).push([[0],{37:function(e,t,a){e.exports=a(46)},42:function(e,t,a){},44:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(23),l=a.n(o),c=(a(42),a(27)),i=a(8),u=a(9),s=a(11),d=a(10),h=a(12),p=a(24),m=(a(44),a(4)),f=a(26),g=a(25),v=a(18),b=a.n(v),x=(a(45),f.a.extend(g.a)),y=function(e){var t=e.unigrams(),a=[],n=[];for(var r in t)""!=t[r].normal&&(a.push(t[r].count),n.push(t[r].normal));return a},w=function(e,t){return function(a){for(var n=a[0],r=a[1],o=Math.pow(r/(r+t),n),l=e[1]?Math.log(o)*e[1]:0,c=2;c<e.length;c++)o=o*t*(n+c-2)/((c-1)*(r+t)),l+=e[c]?Math.log(o)*e[c]:0;return-l}},E=function(e){for(var t=[],a=0;a<e.length;a++)t[e[a]]=t[e[a]]?t[e[a]]+1:1;return t},j=function(e,t,a,n,r){var o=[],l=Math.pow(t/(t+r),e);o[1]=l*a;for(var c=2;c<n;c++)l=l*r*(e+c-2)/((c-1)*(t+r)),o[c]=l*a;return o},C=function(e,t,a){if(e.length!=t.length)return null;for(var n=0,r=1;r<e.length&&e[r];)t[r]>0&&(n+=(e[r]-t[r])*(e[r]-t[r])/t[r]),r++;for(var o=r-a-2,l=0,c=0;r<e.length;)l+=e[r]?e[r]:0,c+=t[r]?t[r]:0,r++;return o<=0&&(o=1),l&&c&&(n+=(l-c)*(l-c)/c),{chisq:O(n,o),df:o}},O=function(e,t){if(!(t<=0)){var a=function(e,t){var a;a=e<=0?0:e<t+1?function(e,t){var a=Math.log,n=Math.exp,r=1/t,o=r,l=1;for(;r>1e-5*o;)o+=r=r*e/(t+l),l+=1;return o*=n(t*a(e)-e-H(t))}(e,t):function(e,t){var a=Math.log,n=Math.exp,r=Math.abs,o=0,l=1,c=1,i=e,u=0,s=0;for(;r((c-u)/c)>1e-5;)u=c,c=e*(o=c+((s+=1)-t)*o)+s*c,o/=i=e*(l=i+(s-t)*l)+s*i,l/=i,c/=i,i=1;return 1-n(t*a(e)-e-H(t))*c}(e,t);return a}(e/2,t/2);return 1-Math.round(1e5*a)/1e5}alert("Degrees of freedom must be positive")};function H(e){var t=Math.log,a=1+76.18009173/e-86.50532033/(e+1)+24.01409822/(e+2)-1.231739516/(e+3)+.00120858003/(e+4)-536382e-11/(e+5);return(e-.5)*t(e+4.5)-(e+4.5)+t(2.50662827465*a)}var q=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(d.a)(t).call(this,e))).state={value:"Copy paste some text you wish to analyze!"},a.handleChange=a.handleChange.bind(Object(m.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleSubmit",value:function(e){this.props.onFormSubmit(this.state.value),e.preventDefault()}},{key:"render",value:function(){return r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",null,r.a.createElement("textarea",{style:{height:400,width:300},value:this.state.value,onChange:this.handleChange})),r.a.createElement("input",{type:"submit",value:"Submit"}))}}]),t}(r.a.Component),M=a(1),S=function(e){for(var t=e.actual,a=e.expected,n=[],r=1;r<t.length;r++){var o={};o.val=t[r]?t[r]:0,o.x0=r,o.x1=r+1,o.type="actual";var l={};l.val=a[r]?a[r]:0,l.x0=r,l.x1=r+1,l.type="expected",n.push(o),n.push(l)}e.r,e.alpha,e.t,e.word_count;M.e(".histogram > *").remove();var c=10,i=30,u=30,s=40,d=460-s-i,h=400-c-u,p=M.e(".histogram").append("svg").attr("width",d+s+i).attr("height",h+c+u).append("g").attr("transform","translate("+s+","+c+")"),m=M.d().domain([1,20]).range([0,d]);p.append("g").attr("transform","translate(0,"+h+")").call(M.a(m));var f=M.d().range([h,0]);f.domain([0,M.c(n,(function(e){return e.val}))]),p.append("g").call(M.b(f)),p.selectAll("rect").data(n).enter().append("rect").attr("x",1).attr("transform",(function(e){return"actual"==e.type?"translate("+m(e.x0)+","+f(e.val)+")":"translate("+(m(e.x0)+.5*(m(e.x1)-m(e.x0)-1))+","+f(e.val)+")"})).attr("width",(function(e){return.5*(m(e.x1)-m(e.x0)-1)})).attr("height",(function(e){return h-f(e.val)})).style("fill",(function(e){return"actual"==e.type?"#69b3a2":"#404080"})),p.append("circle").attr("cx",200).attr("cy",130).attr("r",6).style("fill","#69b3a2"),p.append("circle").attr("cx",200).attr("cy",160).attr("r",6).style("fill","#404080"),p.append("text").attr("x",220).attr("y",130).text("Actual").style("font-size","15px").attr("alignment-baseline","middle"),p.append("text").attr("x",220).attr("y",160).text("Expected").style("font-size","15px").attr("alignment-baseline","middle")},D=function(e){return Object(n.useEffect)((function(){S(e)}),[e.actual?e.actual.length:0]),r.a.createElement("div",{className:"histogram"})},_=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(d.a)(t).call(this,e))).onFormSubmit=function(e){var t=function(e,t){var a=x(e),n=[];switch(t){case"length":n=function(e){var t=e.unigrams(),a=[];for(var n in t)""!=t[n].normal&&a.push(t[n].normal.length);return a}(a);break;case"frequency":n=y(a)}var r=a.sentences().length,o=a.wordCount(),l=E(n),c=b.a.nelderMead(w(l,r),[1,1],null),i=c.x[0],u=c.x[1],s=-c.fx,d=j(i,u,n.length,l.length,r),h=C(l,d,2),p=h.chisq,m=h.df;return{r:i.toFixed(3),alpha:u.toFixed(3),ll:s.toFixed(3),data:n,t:r.toFixed(3),word_count:o,chisq:p.toFixed(3),df:m,actual:l,expected:d,unique_words:n.length}}(e,"frequency");t&&(t.unique_words=t.data.length,a.setState((function(e){return{tableData:[t].concat(Object(c.a)(e.tableData))}}),a.setState({r:t.r,alpha:t.alpha,data:t.data,actual:t.actual,expected:t.expected,t:t.t,word_count:t.word_count,ll:t.ll})))},a.renderHist=function(){if(a.state.r&&a.state.alpha&&a.state.word_count&&a.state.t)return r.a.createElement(D,{data:a.state.data,actual:a.state.actual,expected:a.state.expected,r:a.state.r,alpha:a.state.alpha,t:a.state.t,word_count:a.state.word_count})},a.state={tableData:[]},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App",style:{alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column",padding:50}},r.a.createElement("h1",null,"Measuring Lexical Diversity using the NBD"),r.a.createElement("div",{style:{paddingLeft:100,paddingRight:100}},r.a.createElement("p",{style:{textAlign:"center",alignContent:"center",justifyContent:"center"}},'Lexical Diversity is a measure of an individual\'s vocabulary breadth, often measured by computing the ratio of unique words to total words. While more sophisticated measures have been proposed, such measures are generally scale dependent. By fitting an NBD model to a person\'s given text, we can evaluate the heterogeneity of the word uniqueness within the text and provide a better measure of LD. In general, a lower "r" score indicates more heterogeneity and thus greater vocabulary breadth, while a higher "r" indicates more homogeneity and less breadth.')),r.a.createElement(q,{onFormSubmit:this.onFormSubmit}),this.renderHist(),r.a.createElement("div",{style:k},r.a.createElement(B,{columns:F,data:this.state.tableData})))}}]),t}(r.a.Component),k={},F=[{Header:"Info",columns:[{Header:"r-score",accessor:"r"},{Header:"alpha",accessor:"alpha"},{Header:"t",accessor:"t"},{Header:"Log Likelihood",accessor:"ll"},{Header:"unique words",accessor:"unique_words"},{Header:"word count",accessor:"word_count"},{Header:"Chisq p-value",accessor:"chisq"},{Header:"degrees of freedom",accessor:"df"}]}];function B(e){var t=e.columns,a=e.data,n=Object(p.a)({columns:t,data:a}),o=n.getTableProps,l=n.getTableBodyProps,c=n.headerGroups,i=n.rows,u=n.prepareRow;return r.a.createElement("table",o(),r.a.createElement("thead",null,c.map((function(e){return r.a.createElement("tr",e.getHeaderGroupProps(),e.headers.map((function(e){return r.a.createElement("th",e.getHeaderProps(),e.render("Header"))})))}))),r.a.createElement("tbody",l(),i.map((function(e,t){return u(e),r.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return r.a.createElement("td",e.getCellProps(),e.render("Cell"))})))}))))}var L=_;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[37,1,2]]]);
//# sourceMappingURL=main.f275f8cc.chunk.js.map