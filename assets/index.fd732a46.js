var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,l=(t,n,a)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a,i=(e,t)=>{for(var n in t||(t={}))o.call(t,n)&&l(e,n,t[n]);if(a)for(var n of a(t))r.call(t,n)&&l(e,n,t[n]);return e},s=(e,a)=>t(e,n(a));import{C as c,R as d,a as m,b as u}from"./vendor.d26345c9.js";var _="_app_aohfl_1";var h="_text_editor_k39rm_1";class v{constructor(e,t,n){var a;this.evt=t,this.ele=e.current,this.text=(null==(a=e.current)?void 0:a.textContent)||"",this.defaultText=n}setTextContent(e){this.ele&&y(this.ele,e),this.ele&&p(this.ele)}}const p=e=>{const t=""===e.textContent;e.setAttribute("data-is-empty",t?"true":"false")},y=(e,t)=>{e.textContent=t||""},x=({defaultText:e,placeholder:t,className:n,disabled:a,onInput:o,onDoubleClick:r,onClick:l,onDisabled:i,onAbled:s})=>{const m=c.exports.createRef();return c.exports.useEffect((()=>{a?i&&i(new v(m,null,e||"")):s&&s(new v(m,null,e||""))}),[a]),c.exports.useEffect((()=>{m.current&&(y(m.current,e||""),p(m.current))}),[e]),d.createElement("div",{ref:m,className:`${h} ${n}`,contentEditable:a?"false":"true",placeholder:t,"data-is-empty":"false",onInput:t=>{m.current&&p(m.current),o&&o(new v(m,t,e||""))},onDoubleClick:t=>{r&&r(new v(m,t,e||""))},onClick:t=>{l&&l(new v(m,t,e||""))}})};var g="_file_controller_1cjwy_1",E="_name_editor_1cjwy_21",f="_file_input_control_1cjwy_67",C="_import_1cjwy_75",N="_export_1cjwy_75";const k=({fileName:e,onFileNameChange:t,onImportFile:n,onExportFile:a})=>{const o=c.exports.createRef(),[r,l]=c.exports.useState(!1),i=()=>{document.removeEventListener("click",i),l(!1)},s=()=>{var e;if(!o.current||!o.current.files||0===(null==(e=o.current.files)?void 0:e.length))return;const t=o.current.files[0],a=new FileReader;a.onload=()=>{"string"==typeof a.result&&n(a.result||"")},a.readAsText(t)};return c.exports.useEffect((()=>{var e;return null==(e=o.current)||e.addEventListener("change",s),()=>{var e;null==(e=o.current)||e.removeEventListener("change",s)}})),d.createElement("div",{className:g},d.createElement(x,{className:E,defaultText:e,placeholder:"日记本名",disabled:!r,onClick:e=>{var t,n;r?null==(t=e.evt)||t.stopPropagation():e.evt&&e.ele&&(n=e.ele,e.evt.nativeEvent.stopPropagation(),document.addEventListener("click",i),l(!0),setTimeout((()=>{n.focus()})))},onDisabled:n=>{const a=n.text;""!==a?t(a):n.setTextContent(e)}}),d.createElement("label",{className:C},d.createElement("input",{ref:o,className:f,type:"file"}),d.createElement("div",null,"导入")),d.createElement("div",{className:N,onClick:()=>{a()}},"导出"))};var b="_header_1tgml_1";var I="_years_editor_b3prp_1",w="_active_year_b3prp_9",Y="_dropdown_button_b3prp_57",S="_add_button_b3prp_57",D="_delete_button_b3prp_57",T="_year_options_group_b3prp_107",$="_placeholder_b3prp_149",j="_year_option_b3prp_107";const F=({activeYearIndex:e,yearIndexs:t,onEditYearIndex:n,onSelectYear:a,onDeleteYear:o,onAddYear:r})=>{const[l,i]=c.exports.useState(!1),[s,m]=c.exports.useState(!1),u=t.filter((t=>t!==e)),_=()=>{document.removeEventListener("click",_),m(!1)},h=()=>{document.removeEventListener("click",h),i(!1)},v=e=>()=>{a(e)};return console.log("[YearsEditor Render]"),d.createElement("div",{className:I},d.createElement("div",{className:T,"data-show":l?"true":"false"},0===u.length?d.createElement("div",{className:$},"空"):u.map((e=>d.createElement("div",{key:e,className:j,onClick:v(e)},e)))),d.createElement(x,{defaultText:`${e}`,className:w,disabled:!s,onDoubleClick:e=>{var t;!s&&e.ele&&e.evt&&(t=e.ele,e.evt.nativeEvent.stopPropagation(),document.addEventListener("click",_),m(!0),setTimeout((()=>{t.focus()})))},onClick:t=>{var n;s?null==(n=t.evt)||n.stopPropagation():a(e)},onDisabled:t=>{const a=parseInt(t.text);`${a}`!==t.text||isNaN(a)||u.includes(a)?t.ele&&(t.ele.textContent=`${e}`):n(e,a)}}),d.createElement("div",{className:Y,onClick:e=>{!l&&(e=>{e.stopPropagation(),document.addEventListener("click",h),i(!0)})(e.nativeEvent),s&&_()}},d.createElement("div",null,"")),d.createElement("div",{className:D,onClick:()=>{o(e)}},""),d.createElement("div",{className:S,onClick:()=>{let e=(new Date).getFullYear();for(;t.includes(e);)e++;r(e)}},""))},M=({bookName:e,activeYearIndex:t,yearIndexs:n,onSelectYear:a,onEditYearIndex:o,onDeleteYear:r,onAddYear:l,onBookNameChange:i,onImportFile:s,onExportFile:c})=>(console.log("[Header Render]"),d.createElement("div",{className:b},d.createElement(F,{activeYearIndex:t,yearIndexs:n,onEditYearIndex:o,onAddYear:l,onDeleteYear:r,onSelectYear:a}),d.createElement(k,{fileName:e,onFileNameChange:i,onImportFile:s,onExportFile:c})));var P="_month_list_item_5k1fa_1",A="_month_list_item_index_5k1fa_47",L="_month_list_item_title_5k1fa_63";const O=({monthIndex:e,monthTitle:t,selected:n,onSelectMonth:a})=>d.createElement("div",{className:`${P}`,onClick:a,"data-selected":n?"true":"false"},d.createElement("div",{className:A},e),d.createElement("div",{className:L},t));var R="_month_list_kdvn8_1";const B=({months:e,activeMonthIndex:t,onSelectMonth:n})=>(console.log("[MonthList Render]"),d.createElement("div",{className:R},e.map((e=>d.createElement(O,{monthIndex:e.index,monthTitle:e.title,selected:e.index===t,onSelectMonth:()=>n(e.index),key:e.index})))));var H="_diary_list_mf5ep_1";var q="_diary_list_item_7jkw0_1",J="_diary_list_item_index_7jkw0_47",U="_diary_list_item_title_7jkw0_63";const z=({diaryIndex:e,diaryTitle:t,selected:n,onClick:a})=>d.createElement("div",{className:q,"data-selected":n?"true":"false",onClick:a},d.createElement("div",{className:J},e),d.createElement("div",{className:U},t)),G=({diarys:e,activeDiaryIndex:t,onSelectDiary:n})=>(console.log("[DiaryList Render]"),d.createElement("div",{className:H},e.map((e=>d.createElement(z,{diaryIndex:e.index,diaryTitle:e.title,selected:e.index===t,onClick:()=>n(e.index),key:e.index})))));var K="_diary_page_1dkjo_1",Q="_content_editor_1dkjo_27";var V="_title_editor_1j0jg_1";const W=({target:e,title:t,onChange:n,placeholder:a})=>{const[o,r]=c.exports.useState(t);return c.exports.useEffect((()=>{r(t)}),[e]),console.log("[TitleEditor Render]"),d.createElement(x,{key:e,defaultText:o,placeholder:a||"",className:V,onInput:e=>{n&&n(e.text)}})};var X="_rich_text_editor_13nt0_1";const Z=({handle:e,initialHtmlContent:t,className:n,onChange:a})=>d.createElement(m,{className:`${X} ${n}`,key:e,theme:"snow",value:t,onChange:e=>{a&&a(e)}});var ee="_tag_gex5y_1",te="_text_gex5y_25",ne="_delete_button_gex5y_43";const ae=({target:e,text:t,onChange:n,onDelete:a})=>{const[o,r]=c.exports.useState(t);return c.exports.useEffect((()=>{r(t)}),[e]),d.createElement("div",{className:ee},d.createElement(x,{key:e,defaultText:o,placeholder:"新标签",className:te,onInput:e=>{n(e.text)}}),d.createElement("div",{className:ne,onClick:a},""))};var oe="_tags_bar_qrfca_1",re="_add_button_qrfca_25";const le=({tags:e,onTagsChange:t})=>{const n=n=>()=>{const a=e.filter(((e,t)=>t!==n));t(a)};return d.createElement("div",{className:oe},e.map(((a,o)=>{return d.createElement(ae,{key:o,target:`${e.length}/${o}`,text:a,onChange:(r=o,n=>{const a=[...e];a[r]=n,t(a)}),onDelete:n(o)});var r})),d.createElement("div",{className:re,onClick:()=>{const n=[...e,""];t(n)}},""))};var ie="_current_path_z5u7r_1";const se=({year:e,month:t,date:n})=>d.createElement("div",{className:ie},d.createElement("div",null,e),0===t?void 0:d.createElement("div",null," / ",t),0===n?void 0:d.createElement("div",null," / ",n)),ce=({year:e,month:t,date:n,handle:a,title:o,tags:r,content:l,onTitleChange:i,onTagsChange:s,onContentChange:c,titleEditorPlaceholder:m})=>d.createElement("div",{className:K},d.createElement(se,{year:e,month:t,date:n}),d.createElement(W,{target:`${e}/${t}/${n}`,title:o,onChange:i,placeholder:m}),d.createElement(le,{tags:r,onTagsChange:s}),d.createElement(Z,{className:Q,onChange:c,handle:a,initialHtmlContent:l}));class de{constructor(e=""){this.data=e}}class me{constructor(e,t="",n=[],a=new de("")){this.index=e,this.title=t,this.tags=n,this.content=a}}class ue{constructor(e,t,n="",a=[],o=new de(""),r=Array(((e,t)=>{const n=[void 0,31,28,31,30,31,30,31,30,30,31,30,31];return(e%4==0&&e%100!=0||e%400==0)&&(n[2]=29),n[t]})(e,t)).fill(0).map(((e,t)=>new me(t+1)))){this.yearIndex=e,this.index=t,this.title=n,this.tags=a,this.summary=o,this.diarys=r}}class _e{constructor(e,t="",n=[],a=new de(""),o=Array(12).fill(0).map(((t,n)=>new ue(e,n+1)))){this.index=e,this.title=t,this.tags=n,this.summary=a,this.months=o}}class he{constructor(e="新日记本",t=[new _e((new Date).getFullYear())]){this.bookName=e,this.years=t}}const ve=()=>{const[e,t]=c.exports.useState(new he),[n,a]=c.exports.useState(1/0),[o,r]=c.exports.useState(0),[l,d]=c.exports.useState(0),[m,u]=c.exports.useState(0),_=e.years||[],h=_.filter((e=>e.index===n)).shift(),v=(null==h?void 0:h.months)||[],p=v[o-1],y=(null==p?void 0:p.diarys)||[],x=y[l-1],g=_.map((e=>e.index)),E=e.bookName;0===_.length||_.map((e=>e.index)).includes(n)||a(_.map((e=>e.index)).shift()||1/0);const f=0===n?"none":0===o?"year":0===l?"month":"diary",C={year:{title:n=>{h&&(h.title=n),t(i({},e))},tags:n=>{h&&(h.tags=n),t(i({},e))},summary:n=>{h&&(h.summary.data=n),t(i({},e))}},month:{title:n=>{p&&(p.title=n),t(i({},e))},tags:n=>{p&&(p.tags=n),t(i({},e))},summary:n=>{p&&(p.summary.data=n),t(i({},e))}},diary:{title:n=>{void 0!==x&&(x.title=n,t(i({},e)))},tags:n=>{void 0!==x&&(x.tags=n,t(i({},e)))},content:n=>{void 0!==x&&(x.content.data=n,t(i({},e)))}}},N={title:"year"===f?(null==h?void 0:h.title)||"":"month"===f?(null==p?void 0:p.title)||"":"diary"===f&&(null==x?void 0:x.title)||"",tags:"year"===f?(null==h?void 0:h.tags)||[]:"month"===f?(null==p?void 0:p.tags)||[]:"diary"===f&&(null==x?void 0:x.tags)||[],content:"year"===f?(null==h?void 0:h.summary.data)||"":"month"===f?(null==p?void 0:p.summary.data)||"":"diary"===f&&(null==x?void 0:x.content.data)||"",onTitleChange:"year"===f?C.year.title:"month"===f?C.month.title:"diary"===f?C.diary.title:()=>{},onTagsChange:"year"===f?C.year.tags:"month"===f?C.month.tags:"diary"===f?C.diary.tags:()=>{},onContentChange:"year"===f?C.year.summary:"month"===f?C.month.summary:"diary"===f?C.diary.content:()=>{},titleEditorPlaceholder:"year"===f?"年度总结标题":"month"===f?"月度总结标题":"diary"===f?"日记标题":""};return{yearIndexs:g,months:v,diarys:y,activeDiaryIndex:l,activeMonthIndex:o,activeYearIndex:n,editTarget:N,editorHandle:m,bookName:E,onSelectYear:e=>{u((e=>e+1)),d(0),r(0),a(e)},onSelectMonth:e=>{u((e=>e+1)),d(0),r(e)},onSelectDiary:e=>{u((e=>e+1)),d(e)},onEditYearIndex:(n,o)=>{const l=_.filter((e=>e.index===n)).shift();null!=l&&(l.index=o,_.sort(((e,t)=>e.index-t.index)),t(i({},e)),d(0),r(0),a(o),u((e=>e+1)))},onDeleteYear:n=>{var o;const l=_.filter((e=>e.index!==n));t(s(i({},e),{years:l})),d(0),r(0),a((null==(o=_[0])?void 0:o.index)||1/0),u((e=>e+1))},onAddYear:n=>{const o=[..._];o.push(new _e(n)),o.sort(((e,t)=>e.index-t.index)),t(s(i({},e),{years:o})),d(0),r(0),a(n),u((e=>e+1))},onBookNameChange:n=>{t(s(i({},e),{bookName:n}))},onImportFile:e=>{t((e=>JSON.parse(e))(e))},onExportFile:()=>{const t=new Blob([JSON.stringify(e)]),n=new Date,a=n.getFullYear(),o=`0${n.getMonth()+1}`.slice(-2),r=`0${n.getDate()}`.slice(-2),l=`0${n.getHours()}`.slice(-2),i=`0${n.getMinutes()}`.slice(-2),s=`0${n.getSeconds()}`.slice(-2);((e,t)=>{const n=document.createElement("a");n.download=e,n.href=window.URL.createObjectURL(t),n.style.display="none",n.style.position="fixed",document.body.appendChild(n),n.click()})(`${e.bookName}-${a}${o}${r}-${l}${i}${s}.json`,t)}}},pe=()=>{const{yearIndexs:e,months:t,diarys:n,activeYearIndex:a,activeDiaryIndex:o,activeMonthIndex:r,editTarget:l,editorHandle:i,bookName:s,onSelectYear:c,onSelectMonth:m,onSelectDiary:u,onEditYearIndex:h,onDeleteYear:v,onAddYear:p,onBookNameChange:y,onImportFile:x,onExportFile:g}=ve();return console.log("[App Render]"),d.createElement("div",{id:"app",className:_},d.createElement(M,{activeYearIndex:a,yearIndexs:e,bookName:s,onSelectYear:c,onEditYearIndex:h,onDeleteYear:v,onAddYear:p,onBookNameChange:y,onImportFile:x,onExportFile:g}),d.createElement(B,{months:t,activeMonthIndex:r,onSelectMonth:m}),0===r?void 0:d.createElement(G,{diarys:n,activeDiaryIndex:o,onSelectDiary:u}),d.createElement(ce,{year:a,month:r,date:o,handle:i,title:l.title,tags:l.tags,content:l.content,titleEditorPlaceholder:l.titleEditorPlaceholder,onContentChange:l.onContentChange,onTagsChange:l.onTagsChange,onTitleChange:l.onTitleChange}))};u.render(d.createElement(d.StrictMode,null,d.createElement(pe,null)),document.getElementById("root"));
