//! return Ip using (cloudflare API) https://github.com/fawazahmed0/cloudflare-trace-api
let ipv
function ipAddress(){
   fetch('https://1.1.1.1/cdn-cgi/trace')
    .then(data=>data.text())
    .then(returnData=>returnData.trim().split('\n').filter(el => el.startsWith("ip")))
    .then(code=>code.forEach((item)=>{
        localStorage.setItem('ip',item)
        ipv=item
        console.log('Inside',ipv)
    
    }))
    .catch(error=>console.log(error))

}
// ipAddress()
// setTimeout(()=>{
//     console.log(checkVisit())
// },300)



function checkVisit(){

    let ip=localStorage.getItem('ip')
    console.log(ip)
    console.log('Outside',ipv)
    if (localStorage.getItem('ip')==ipv)
    {
        window.location.href = "./quize.html";
       
    }
    else
    {
        return false
    }
}



let listElement=document.querySelector("ul")
let submitBtn = document.getElementById("submit");

let Quizzes=[]


fetch(`https://quizapi.io/api/v1/questions?apiKey=TM7jRsopbYOoYsKZTcQ7eidrz68jRfjqBsQxDao5&limit=3`)
.then(res=>res.json())
.then(data=>data.forEach((element,index)=>{
    
    Quizzes.push(element)
    console.log(Quizzes)
 
}

)
    
    
)
.catch(err=>console.log('Error' + err))
 
let currentQuiz=0
let score=0


//showQuiz()

setTimeout(()=>{
    showQuiz()
},1000)


function showQuiz()
{
    listElement.innerHTML=""
    //deselectAnswers()
    let quiz=Quizzes[currentQuiz]
    // let answerEl=Quizzes[currentQuiz].correct_answer
    // console.log(answerEl)

    document.getElementById("question").innerHTML=quiz.question
    
    
    for (ans in quiz.answers)
    {
        
           //check if ans is null
      if(quiz.answers[ans]!=null)
      {

        let li=document.createElement("li")
        let radioBtn=document.createElement("input")
        radioBtn.setAttribute("type","radio")
        radioBtn.setAttribute('class','answer')
        radioBtn.setAttribute("value",ans)
        radioBtn.setAttribute("id",ans)
        li.appendChild(radioBtn)


        let label=document.createElement("label")
        label.setAttribute("for",ans)
        
        label.textContent=quiz.answers[ans]


        
        li.appendChild(label)
        
        

        listElement.appendChild(li).appendChild(document.createElement("br"))

       
    }
        

}
}

function getSelected() {
    let answerEls = document.querySelectorAll(".answer");
    let answer = undefined;
    //console.log(answerEls)

    answerEls.forEach((elementAnswer) => {
        if (elementAnswer.checked) {
            answer = elementAnswer.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}


submitBtn.addEventListener("click", () => {
    // check to see the answer
    const answer = getSelected();
    // console.log('welcome')
    // console.log(answer)

    if (answer) {
        if (answer === Quizzes[currentQuiz].correct_answer) {
            score++;
        }

        currentQuiz++;
        if (currentQuiz < Quizzes.length) {
            showQuiz();
        } else {
            let quizContainerElement=document.getElementById("quiz-container")
            quizContainerElement.innerHTML=""
            
            
            let h2Element=document.createElement('h2')
            h2Element.textContent=`Your score is ${score} out of ${Quizzes.length}`
            
            quizContainerElement.appendChild(h2Element)
            let resultImg=document.createElement('img')
            resultImg.setAttribute("src",`https://image-charts.com/chart?chan&chd=a:${score}|${Quizzes.length-score}&chf=ps0-0%2Clg%2C45%2Cffeb3b%2C0.2%2Cf44336%2C1%7Cps0-1%2Clg%2C45%2C8bc34a%2C0.2%2C009688%2C1&chl=Right|Wrong&chs=300x190&cht=p3`)
            resultImg.setAttribute('class','result-img')
            quizContainerElement.appendChild(resultImg)
            let btn=document.createElement("button")
            btn.setAttribute("id","btn")
            btn.setAttribute('onclick','location.reload()')
            btn.textContent="Restart"
            quizContainerElement.appendChild(btn)

           
        }
    }
});