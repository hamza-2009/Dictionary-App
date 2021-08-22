let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = 'd8d83a9e-c3b4-4259-a1b3-14b5aa180656';
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loader = document.querySelector('.loading');


searchBtn.addEventListener('click', function(e){
     e.preventDefault();
     

     audioBox.innerHTML = '';
     notFound.innerText = '';
     defBox.innerText = '';
     //get input data
        let word = input.value;
     //call API get data
     if (word === ''){
        alert('Word is required');
        return;
     }

     getData(word);
})

async function getData(word){

   loader.style.display = 'block';

  const response = await fetch (`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);
   const data = await response.json();

   if (!data.length){
      loader.style.display = 'none';
      notFound.innerText ='Sorry Not Found';
      return;
   }


   if (typeof data[0] === 'string'){
      loader.style.display = 'none';
      let heading = document.createElement('h3');
      heading.innerText = 'Did you mean?'
      notFound.appendChild(heading);
      data.forEach(element => {
         let suggetion = document.createElement('span');
         suggetion.classList.add('suggested');
         suggetion.innerText = element;
         notFound.appendChild(suggetion);
      })

      return;

   }

   loader.style.display = 'none';
   let defination = data[0].shortdef[0];
   defBox.innerText = defination;



   const soundName = data[0].hwi.prs[0].sound.audio;
   if(soundName) {
      renderSound(soundName)
   }
   console.log(data);

}

function renderSound(soundName){
   //https://media.merriam-webster.com/soundc11
   let subfolder = soundName.charAt(0);
   let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

   let aud = document.createElement('audio');
   aud.src = soundSrc;
   aud.controls = true;
   audioBox.appendChild(aud);
}