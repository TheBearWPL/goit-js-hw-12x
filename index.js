import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as r,a as p,S as f}from"./assets/vendor-Qob_5Ba8.js";const u=document.getElementById("search-form"),i=document.getElementById("gallery"),c=document.getElementById("loader"),n=document.getElementById("load-more"),L="46626572-71017a8957be8250d73e50a3e";let o="",a=1,s=0;u.addEventListener("submit",async t=>{if(t.preventDefault(),o=document.getElementById("query").value.trim(),!o){r.error({title:"Error",message:"Please enter a search term!"});return}w(),a=1,n.classList.add("hidden"),m();try{const e=await d(o,a);if(s=e.totalHits,l(),e.hits.length===0){r.info({message:"Sorry, there are no images matching your search query. Please try again!"});return}h(e.hits),e.hits.length<s&&n.classList.remove("hidden")}catch{g()}});async function d(t,e){const y=`https://pixabay.com/api/?key=${L}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${e}&per_page=40`;return(await p.get(y)).data}function h(t){i.insertAdjacentHTML("beforeend",t.map(e=>`
        <a href="${e.largeImageURL}" class="gallery-item">
          <img src="${e.webformatURL}" alt="${e.tags}" />
          <div class="info">
            <p>Likes: ${e.likes}</p>
            <p>Views: ${e.views}</p>
            <p>Comments: ${e.comments}</p>
            <p>Downloads: ${e.downloads}</p>
          </div>
        </a>`).join("")),E()}n.addEventListener("click",async()=>{a+=1,m();try{const t=await d(o,a);h(t.hits),a*40>=s&&(n.classList.add("hidden"),r.info({message:"We're sorry, but you've reached the end of search results."})),b()}catch{g()}finally{l()}});function w(){i.innerHTML=""}function m(){c.classList.remove("hidden")}function l(){c.classList.add("hidden")}function E(){new f(".gallery-item",{captionsData:"alt",captionDelay:250}).refresh()}function b(){const{height:t}=i.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}function g(){r.error({title:"Error",message:"Something went wrong. Please try again later."}),l()}
//# sourceMappingURL=index.js.map
