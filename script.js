var keywords
var ct
var graded
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
            
            
            if (isKeyword(word)) {
                keywords.push(word)
            }
            words.push(rawwords[i])
        }
        words.push("ENDL")
    }


    var text_with_blanks = make_text(words, keywords);

    document.getElementById("blanked_text").style.visibility="visible"
    document.getElementById("blanked_text").innerHTML = text_with_blanks
    document.getElementById("grader_button").style.visibility="visible"
}

function isKeyword(word) {
    return word.length>7
}

function make_text(words, keywords) {
    var ret = ""
    ct = 0

    var endl = ["ENDL"]
    for (k=0; k<words.length; k++) {
        var word = words[k]
        if (endl.includes(word)) {
            ret+="<br>"
        }
        else if (keywords.includes(strip_punc(word))) {
            l=0
            while (!isLetter(word.charAt(l))) {
                ret+=word.charAt(l)
            }
            ret+="<input type=\"text\" id= input"+ct+">"
            while (l<word.length) {
                while (isLetter(word.charAt(l))) l++
                if (l<word.length) {
                    ret+=word.charAt(l)
                    l++
                }
            }
            ret+="</b> "
            ct++
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
    var guesses = []

    for (b=0; b<ct; b++) {
        guesses.push(document.getElementById("input"+b).value)
    }

    var numwrong=0;
    var numright=0;

    for (a=0; a<guesses.length; a++) {
        guess = guesses[a].toLowerCase()
        ans = keywords[a]
        var anslist = [ans.toLowerCase()]

        if (anslist.includes(guess)) {
            document.getElementById("input"+a).style.color="green"
            numright+=1
        }
        else {
            document.getElementById("input"+a).style.color="red"
            numwrong+=1
            
        }
    }
    var numtot = numright+numwrong
    document.getElementById("overview").style.visibility="visible"
    document.getElementById("overview").innerHTML= numright+" out of "+numtot+" keywords correct."
    document.getElementById("resetter").style.visibility="visible"
    document.getElementById("showres_button").style.visibility="visible"

}

function show_results() {
    for (ee=0; ee<ct; ee++) {
        document.getElementById("input"+ee).value = keywords[ee]
        document.getElementById("input"+ee).style.color="blue"
    }
}

function reset() {
    document.getElementById("blanked_text").style.visibility = "hidden"
    document.getElementById("grader_button").style.visibility = "hidden"
    document.getElementById("overview").style.visibility = "hidden"
    document.getElementById("resetter").style.visibility = "hidden"
    document.getElementById("showres_button").style.visibility = "hidden"
}



/*
SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT
Most humans fall into one of four blood groups — A, B, AB or O.
Ordinarily, your blood type makes very little difference in your daily life except if you need to have a blood transfusion.
However, people with Type A may have a higher risk of catching Covid-19 and of developing severe symptoms, recent research has suggested, while people with Type O blood have a lower risk. These study results follow evidence from past research that certain blood groups are more vulnerable to other diseases like cancer.
But why we have blood types and what purpose they serve is still largely unknown, and very little is known about their links to viruses and disease. Unlocking what role blood types play would potentially help scientists better understand the risk of disease for people in different blood groups.
"I think it's fascinating, the evolutionary history, even though I don't think we have the answer of why we have different blood types," said Laure Segurel, a human evolutionary geneticist and a researcher at the National Museum of Natural History in France.
*/