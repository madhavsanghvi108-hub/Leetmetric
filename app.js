document.addEventListener("DOMContentLoaded",()=>{
        const searchButton=document.querySelector('#submit-button');
        const easycircle=document.querySelector('.easy-progress');
        const mediumcircle=document.querySelector('.medium-progress');
        const hardcircle=document.querySelector('.hard-progress'); 
        const usernameInput=document.querySelector('#inputbox');

        const easylabel=document.getElementById('easy');
        const mediumlabel=document.getElementById('medium');
        const hardlabel=document.getElementById('hard');

        const cardStatsContainer=document.querySelector('.stats-card');


        function validateUserName(username){
                if(username.trim()==="")
                {
                        alert("username should not be empty");
                        return false;
                }
                const regex = /^[a-zA-Z0-9_]+$/;
                const isMatching=regex.test(username);
                return isMatching;
        }
        async function displaythedata(data)
        {
                let easyone=data.easySolved;
                let hardone=data.hardSolved;
                let mediumone=data.mediumSolved;
                console.log(easyone);
                let easys=data.totalEasy;
                let hards=data.totalHard;
                let mediums=data.totalMedium;

                let easyelement=document.querySelector('.easy-progress');
                const easydone=(easyone/easys)*100;
                easyelement.style.setProperty('--progress-degree', `${easydone}%`);

                let mediumelement=document.querySelector('.medium-progress');
                const mediumdone=(mediumone/mediums)*100;
                mediumelement.style.setProperty('--progress-degree', `${mediumdone}%`);

                let hardelement=document.querySelector('.hard-progress');
                const harddone=(hardone/hards)*100;
                hardelement.style.setProperty('--progress-degree', `${harddone}%`);

                easylabel.textContent=`${easyone}/${easys}`;
                mediumlabel.textContent=`${mediumone}/${mediums}`;
                hardlabel.textContent=`${hardone}/${hards}`;

                easyelement.style.background =
                `conic-gradient(#63cdda ${easydone}%, #2a3032 0%)`;

                mediumelement.style.background =
                `conic-gradient(#f7b731 ${mediumdone}%, #2a3032 0%)`;

                hardelement.style.background =
                `conic-gradient(#fc5c65 ${harddone}%, #2a3032 0%)`;
                                
                const cardsdata=[
                        {
                                label:"Total Submission",
                                value:data.totalSubmissions[0].submissions
                        },
                        {
                                label:"Easy Submission",
                                value:data.totalSubmissions[1].submissions
                        },
                        {
                                label:"Medium Submission",
                                value:data.totalSubmissions[2].submissions
                        },
                        {
                                label:"Hard Submission",
                                value:data.totalSubmissions[3].submissions
                        }
                ]
                const cardsStatscontainer=document.querySelector('.stats-card');
                cardsStatscontainer.innerHTML=cardsdata.map(
                        data=>{
                                return `
                                        <div class="card">
                                                <h5>${data.label}</h5>
                                                <p>${data.value}</p>
                                        </div>
                                `
                        }
                ).join("");
                // console.log("cards ka data",cardsdata);
        }
        async function fetchUserDetails(username)
        {
               try
               {
                        const data=await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
                        if(!data.ok)
                        {
                                alert("User not found, enter a valid leetcode user");
                        }
                        const final=await data.json();
                        if (!final || final.errors) {
                                alert("User not found, enter a valid leetcode user")
                                throw new error("user not found")
                        
                        }
                        console.log(final);
                        displaythedata(final);
               }
               catch(error){
                        throw new Error("Cannot find the data");
               }
               finally{
                        searchButton.innerHTML="Search";
                        searchButton.disabled=false;
               }        
        }  
        searchButton.addEventListener('click',()=>{
                const username=usernameInput.value;
                usernameInput.value="";
                if(validateUserName(username))
                {
                        searchButton.innerHTML="Searching...";
                        searchButton.disabled=true;
                        fetchUserDetails(username);
                }
                else{
                     
                }
        })
})