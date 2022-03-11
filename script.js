let a_text = document.getElementById("a_text");
let b_text = document.getElementById("b_text");
let c_text = document.getElementById("c_text");
let d_text = document.getElementById("d_text");
let listElement=document.querySelector("ul")
let submitBtn = document.getElementById("submit");

let Quizzes=[]


fetch(`https://quizapi.io/api/v1/questions?apiKey=TM7jRsopbYOoYsKZTcQ7eidrz68jRfjqBsQxDao5&limit=3`)
.then(res=>res.json())
.then(data=>data.forEach((element,index)=>{
    
    Quizzes.push(element)
 
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
    let quiz=Quizzes[currentQuiz]
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