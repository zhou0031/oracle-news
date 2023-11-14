const baseUrl="https://www.bbc.com/zhongwen/simp"
const linkClassSelector = '[aria-labelledby="Top-stories"] li.ebmt73l0 h3 a'; 
const cheerio = require('cheerio');
const axios=require('axios')

async function getBbcNews(){  
   
    try {
        const response=await axios.get(baseUrl)
	      const $ = await cheerio.load(response.data)
        
        // Extract links with the specified class selector from the current page
        const links = [];
        $(linkClassSelector).each((index, element) => {
          const link = $(element).attr('href');
          if (link) {
            const absoluteUrl = new URL(link, baseUrl).href;
            links.push(absoluteUrl);
          }
        });
        
        const news=[]
        
        let e
        for (const link of links){
          try{
            const response =  await axios.get(link);
            const $ = cheerio.load(response.data);
            
            const title = $("div.bbc-1151pbn").text();
            const content=[]
            const photos=[]    
            
            $('p.bbc-w2hm1d').each((index, element) => {           
                content.push($(element).text())
            });
            
            $('figure').each((index,element)=>{
              e = cheerio.load(element)
              const src=e('picture > img').attr('src')
              const alt=e('figcaption p').text()
              photos.push({src:src,alt:alt})
            })
            
            news.push({title,content,photos,publisher:3})
            
          }catch(e){
            console.log(e)
          }
        }
        
        return news     
        
        } catch (error) {
            console.log(error)
            return null
        }
        
}

module.exports=getBbcNews;
