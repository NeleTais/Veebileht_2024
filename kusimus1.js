// kood on loodud võttes inspiratsiooni https://simplestepscode.com/javascript-quiz-tutorial/ leheküljelt, muutujanimetused ja paar muud asja on muudetud
// js kood kirjeldab multiple choice questions quizi esimese alamlehe kohta, millel räägitakse getting things done hackist
document.addEventListener('DOMContentLoaded', function() {

    var konteiner = document.getElementById('quiz');

    var tulemused = document.getElementById('results');

    var esitanupp = document.getElementById('submit');

    //siin on küsimuseed ja nende vastused
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
        // peame kuskil hoiustama meie küsimusi
        var väljund = [];
        var vastused;
    
        // ja seda on vaja iga küsimuse kohta
        for(var i=0; i<küsimused.length; i++){
            
            vastused = [];
    
            // iga voimaliku vastuse kohta
            for(täht in küsimused[i].vastused){
    
                // lisame ka vastamiseks html-i radio nupu
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
        
        // paneme lopliku valjundi oigesse kohta
        konteiner.innerHTML = väljund.join('');
    }
    
    
    function kuvatulemus(küsimused, konteiner, tulemused){
        
        // kogume vastuse konteinerid oma küsimustest
        var answerContainers = konteiner.querySelectorAll('.vastused');
        
        // hoiame meeles mis vastused kasutaja sisestab
        var userAnswer = '';
        var numCorrect = 0;
        
        // iga üsimuse kohta
        for(var i=0; i<küsimused.length; i++){
    
            // leiame valitud vastused
            userAnswer = (answerContainers[i].querySelector('input[name=küsimus'+i+']:checked')||{}).value;
            
            // vaatame kas vastus on oige
            if(userAnswer===küsimused[i].oigevastus){
                // lisame selle oigesti vastatud küsimuste hulka
                numCorrect++;
                
                // küsimus värvub roheliseks
                answerContainers[i].style.color = 'lightgreen';
            }
            // kui vastus on tühi või vale
            else{
                // teeme küsimuse punaseks
                answerContainers[i].style.color = 'red';
            }
        }
    
        // naitame kui mitu oiget vastust kasutajal oli
        tulemused.innerHTML = numCorrect + ' out of ' + küsimused.length;
    }
    
    
    function generateQuiz(küsimused, konteiner, tulemused, esitanupp){
    
        // naitame kusimusi
        kuvaküsimused(küsimused, konteiner);
    
        // kui kasutaja vajutab "esita"/"submit" siis näitame tulemust
        esitanupp.onclick = function(){

            kuvatulemus(küsimused, konteiner, tulemused);
        };
    }
    
    generateQuiz(muküsimused, konteiner, tulemused, esitanupp);


});

