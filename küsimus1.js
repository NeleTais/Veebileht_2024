// kood on loodud võttes inspiratsiooni https://simplestepscode.com/javascript-quiz-tutorial/ leheküljelt, muutujanimetused ja paar muud asja on muudetud
// js kood kirjeldab multiple choice questions quizi viienda alamlehe kohta, millel räägitakse mitmest väiksest õpihäkist
document.addEventListener('DOMContentLoaded', function() {

    var konteiner = document.getElementById('quiz');

    var tulemused = document.getElementById('results');

    var esitanupp = document.getElementById('submit');


    var muküsimused = [
        {
            küsimus: "Which list includes ideas and tasks as they occur to you?",
            vastused: {
                a: 'next actions list',
                b: 'waiting for list',
                c: 'in list'
            },
            oigevastus: 'c'
        },
        {
            küsimus: "When should you move an idea to the someday/maybe list?",
            vastused: {
                a: "When you realize you don't have the time to deal with it at the moment",
                b: 'When it is a something you definetly need to deal with soon',
                c: 'When it is something you will never do or think about again'
            },
            oigevastus: 'a'
        }
    ];
    
    function kuvaküsimused(küsimused, konteiner){
        // we'll need a place to store the output and the answer choices
        var väljund = [];
        var vastused;
    
        // for each question...
        for(var i=0; i<küsimused.length; i++){
            
            // first reset the list of answers
            vastused = [];
    
            // for each available answer to this question...
            for(täht in küsimused[i].vastused){
    
                // ...add an html radio button
                vastused.push(
                    '<label>'
                        + '<input type="radio" name="küsimus'+i+'" value="'+täht+'">'
                        + täht + ': '
                        + küsimused[i].vastused[täht]
                    + '</label>'
                );
            }
            

            väljund.push(

                '<div class="küsimus">' + küsimused[i].küsimus + '</div>'
    
                + '<div class="vastused" style="display: flex; flex-direction: column;">' + vastused.join('') + '</div>'
                + '<br>'
    
            );
        }
        
        // finally combine our output list into one string of html and put it on the page
        konteiner.innerHTML = väljund.join('');
    }
    
    
    function kuvatulemus(küsimused, konteiner, tulemused){
        
        // gather answer containers from our quiz
        var answerContainers = konteiner.querySelectorAll('.vastused');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        
        // for each question...
        for(var i=0; i<küsimused.length; i++){
    
            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=küsimus'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===küsimused[i].oigevastus){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }
    
        // show number of correct answers out of total
        tulemused.innerHTML = numCorrect + ' out of ' + küsimused.length;
    }
    
    
    function generateQuiz(küsimused, konteiner, tulemused, esitanupp){
    
        // show the questions
        kuvaküsimused(küsimused, konteiner);
    
        // when user clicks submit, show results
        esitanupp.onclick = function(){

            kuvatulemus(küsimused, konteiner, tulemused);
        }
    }
    
    generateQuiz(muküsimused, konteiner, tulemused, esitanupp);


});

