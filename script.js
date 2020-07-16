var keywords

function parseText() {
    keywords = []
    var rawtext = document.getElementById("input_text").value;

    document.getElementById("input_text").value = "";
    var rawpara = rawtext.split("\n")

    var words = []

    for (para=0; para<rawpara.length; para++) {
        var rawwords = rawpara[para].split(" ")
        for (i=0; i<rawwords.length; i++) {
            var word = strip_punc(rawwords[i])
            
            
            if (word.length>7) {
                keywords.push(word)
            }
            words.push(rawwords[i])
        }
        words.push("ENDL")
    }


    var text_with_blanks = make_text(words, keywords);

    document.getElementById("blanked_text").innerHTML = text_with_blanks
    document.getElementById("instruc").visibility="visible"
    document.getElementById("input_keywords").visibility="visible"
    document.getElementById("grader_button").visibility="visible"
}

function make_text(words, keywords) {
    var ret = ""
    var ct = 1

    var endl = ["ENDL"]
    for (k=0; k<words.length; k++) {
        var word = words[k]
        if (endl.includes(word)) {
            ret+="<br>"
        }
        else if (keywords.includes(strip_punc(word))) {
            ret+= "<b>"+ct+". "
            for (l=0; l<word.length; l++) {
                if (isLetter(word.charAt(l))) ret+="_"
                else ret+=word.charAt(l)
            }
            ret+="</b> "
            ct+=1
        }
        else {
            ret+=word+" "
        }
    }

    return ret
}

function strip_punc(word) {
    var ret = ""

    for (j=0; j<word.length; j++) {
        var c = word.charAt(j);
        if (isLetter(c)) ret+=c
    }

    return ret
}

function isLetter(c) {
    return c>='a'&&c<='z' || c>='A'&&c<='Z'
}



function grade() {
    var user_input = document.getElementById("input_keywords").value;
    document.getElementById("input_keywords").value = "";
    guesses = user_input.split("\n");
    ret=""
    var numwrong=0;
    var numright=0;

    for (a=0; a<guesses.length; a++) {
        guess = guesses[a].toLowerCase()
        ans = keywords[a]
        document.getElementById("graded_text").innerHTML=guess+" "+ans
        var anslist = [ans.toLowerCase()]

        if (anslist.includes(guess)) {
            ret+="<span style=\"color:green;font-weight:bold\">"+guess+"</span><br>"
            numright+=1
        }
        else {
            ret+="<span style=\"color:red;font-weight:bold\">"+ans+" (Your answer: "+guess+")</span><br>"
            numwrong+=1
            
        }
        document.getElementById("graded_text").innerHTML=ret
    }
    var numtot = numright+numwrong
    document.getElementById("overview").innerHTML= numright+" out of "+numtot+" keywords correct."

}



/*
SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT
Most humans fall into one of four blood groups — A, B, AB or O.
Ordinarily, your blood type makes very little difference in your daily life except if you need to have a blood transfusion.
However, people with Type A may have a higher risk of catching Covid-19 and of developing severe symptoms, recent research has suggested, while people with Type O blood have a lower risk. These study results follow evidence from past research that certain blood groups are more vulnerable to other diseases like cancer.
But why we have blood types and what purpose they serve is still largely unknown, and very little is known about their links to viruses and disease. Unlocking what role blood types play would potentially help scientists better understand the risk of disease for people in different blood groups.
"I think it's fascinating, the evolutionary history, even though I don't think we have the answer of why we have different blood types," said Laure Segurel, a human evolutionary geneticist and a researcher at the National Museum of Natural History in France.
*/