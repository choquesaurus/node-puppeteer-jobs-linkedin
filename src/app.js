require('dotenv').config();
import '@babel/polyfill';
//import scrollPageToBottom from 'puppeteer-autoscroll-down';
import puppeteer from 'puppeteer';
async function  Init(){
        const browser=await puppeteer.launch({headless:false
          //userDataDir: "./user_data"
        });
        const page=await browser.newPage();
        await page.setViewport({
          width:1200,
          height:720
        })
        await page.goto('https://www.linkedin.com/login');
      
        /*
        const Searchtitle=await page.$('h1');
        const title=await page.evaluate(data=>data.textContent,Searchtitle);
        */
        // const title2=await page.$eval('h1',data=>data.textContent);
        // console.log(title2);
         const inputUser='#username';
         const inputPass='#password';
         //const listConnectionCard='.mn-connection-card';
        await page.waitForSelector(inputUser)
        await page.waitForSelector(inputUser)
        await page.type(inputUser,process.env.usuario)
        await page.type(inputPass,process.env.password)
        await page.click('.btn__primary--large');
        await page.goto('https://www.linkedin.com/jobs/')
        //const lastPosition = await scrollPageToBottom(page)
        //console.log(`lastPosition: ${lastPosition}`)
        const scrolling =await page.evaluate(()=>{
          return new Promise((resolve) => {
            let count = 0
            const intervalId = setInterval(() => {
              window.scrollBy(0,200)
              if (count >= 16000) {
                clearInterval(intervalId)
                resolve(count)
              }
              count += 100
            }, 100)
          })  
        })
        console.log(scrolling)
      //   await page.evaluate( () => {
      //     window.scrollBy(0, window.innerHeight);
      // });
        //await page.waitForSelector(listConnectionCard);
       
          //jobs linkedin

          //cargo
          //document.querySelectorAll('.job-card')[0].querySelector('.job-card__title').innerText

          //logo
          //document.querySelectorAll('.job-card')[0].querySelector('.js-job-card-company-logo').getAttribute('src')

          //empresa
          //document.querySelectorAll('.job-card')[0].querySelector('.job-card__company-name').innerText

        //ubicacion
        //document.querySelectorAll('.job-card')[0].querySelector('.job-card__location').innerText.split('empleo\n')[1]

        //status

        //document.querySelectorAll('.job-card')[0].querySelector('.job-card__listed-status').innerText

       const data=await page.evaluate(()=>
        [...document.querySelectorAll(".job-card")].map(item=> {
              let cargo=item.querySelector('.job-card__title').innerText
              let logo=item.querySelector('.js-job-card-company-logo').getAttribute('src')
              let empresa=item.querySelector('.job-card__company-name').innerText
              let ubicacion=item.querySelector('.job-card__location').innerText.split('empleo\n')[1]
              let status=item.querySelector('.job-card__listed-status').innerText 
              return {
                    cargo,
                    logo,
                    empresa,
                    ubicacion,
                    status
                }
            })
            )
            await page.close();
            await browser.close();
           return data;   
    };
export default Init;
//Init();
//go();