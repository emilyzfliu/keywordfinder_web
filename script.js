var keywords
var ct
var graded
var guesses
var wrong_indexes
var col_correct = "#159454"
var col_wrong = "#ff5e5e"
var col_grader = "#1a61f0"

function parseText() {
    keywords = []
    var rawtext = document.getElementById("input_text").value;

    document.getElementById("input_text").value = "";
    var rawpara = rawtext.split("\n")

    var words = []

    for (para=0; para<rawpara.length; para++) {
        var rawwords = rawpara[para].split(/\s|-/)
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

    document.getElementById("readerButton").style ="display:none;"
    document.getElementById("input_text").style="display:none;"
    document.getElementById("instructions").style="display:none;"
    document.getElementById("brk1").style="display:none;"
    document.getElementById("brk2").style="display:none;"

    document.getElementById("blanked_text").style="display:visible;"
    document.getElementById("blanked_text").innerHTML = text_with_blanks
    document.getElementById("grader_button").style="display:visible;"
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
            w = word.length*10
            ret+="  <input type=\"text\" class= \"input_text\" id= input"+ct+" style=\"width: "+w+"px;\">  "
            while (l<word.length) {
                while (isLetter(word.charAt(l))) l++
                if (l<word.length) {
                    ret+=word.charAt(l)
                    l++
                }
            }
            ct++
        }
        else {
            ret+=" "+word+" "
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
    return c>='a'&&c<='z' || c>='A'&&c<='Z' || c=='\''
}



function grade() {
    guesses = []

    for (b=0; b<ct; b++) {
        guesses.push(document.getElementById("input"+b).value)
    }

    var numwrong=0;
    var numright=0;

    wrong_indexes = []

    for (a=0; a<guesses.length; a++) {
        guess = guesses[a].toLowerCase()
        ans = keywords[a]
        var anslist = [ans.toLowerCase()]

        if (anslist.includes(guess)) {
            document.getElementById("input"+a).style.color=col_correct
            numright+=1
        }
        else {
            document.getElementById("input"+a).style.color=col_wrong
            numwrong+=1
            wrong_indexes.push(a)
        }
    }
    var numtot = numright+numwrong
    document.getElementById("overview").style="display:visible;"
    document.getElementById("overview").innerHTML= numright+" out of "+numtot+" keywords correct."
    document.getElementById("resetter").style="display:visible;"
    document.getElementById("showres_button").style="display:visible;"
    document.getElementById("showog_button").style="display:visible;"

}

function show_results() {
    for (ee=0; ee<ct; ee++) {
        document.getElementById("input"+ee).value = keywords[ee]
        if (wrong_indexes.includes(ee)) {
            document.getElementById("input"+ee).style.color=col_grader
        }
    }
}

function show_og() {
    for (ee=0; ee<ct; ee++) {
        document.getElementById("input"+ee).value = guesses[ee]
        if (wrong_indexes.includes(ee)) {
            document.getElementById("input"+ee).style.color=col_wrong
        }
    }
}

function reset() {
    document.getElementById("blanked_text").style="display:none;"
    document.getElementById("grader_button").style="display:none;"
    document.getElementById("overview").style="display:none;"
    document.getElementById("resetter").style="display:none;"
    document.getElementById("showres_button").style="display:none;"
    document.getElementById("showog_button").style="display:none;"

    document.getElementById("readerButton").style ="display:visible;"
    document.getElementById("input_text").style="display:visible;"
    document.getElementById("instructions").style="display:visible;"
    document.getElementById("brk1").style="display:visible;"
    document.getElementById("brk2").style="display:visible;"
}