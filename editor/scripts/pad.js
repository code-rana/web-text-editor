localStorage.padnumbers=0;  // set a local variable
function line(event)
{
	if(event.keyCode==13)		// check if key pressed is ENTER
	{
		if(localStorage.padnumbers==0) // if first time pressed
		{
			document.getElementById('padnumbers').value=localStorage.padnumbers;		// set 0 at first place
			localStorage.padnumbers=parseInt(localStorage.padnumbers)+1					// increase local variable
			document.getElementById('padnumbers').value=document.getElementById('padnumbers').value+'\n'+localStorage.padnumbers;		
					// after setting to zero put a new line
		}
		else
		{			// after zero has been set keep on adding the local variable so that it return 0 1 2 with /n and so on
					document.getElementById('padnumbers').value=document.getElementById('padnumbers').value+'\n'+localStorage.padnumbers;
		}
		localStorage.padnumbers=parseInt(localStorage.padnumbers)+1;	
		 // increase local variable by 1

				document.getElementById('padnumbers').scrollTop=localStorage.padnumbers+1;
	}

	var words=document.getElementById('pad').value;
	var chars=0;
	var space=0;
	var w=0;
	for(var i=0;i<words.length;i++)
	{
		if(words.charAt(i)==' ')
		{
			if(words.charAt(i-1)!=' ')
			space=space+1;	
		}
		w=space+1;

		if(words.charAt(i)==' '||words.charAt(i)=='\t'||words.charAt(i)=='\n')
		{
		
		}
		
		else
		{
			chars=chars+1;
		}
	}
	document.getElementById('chars').value=chars;
	document.getElementById('words').value=w;
	
}
function fontChange()
{
		document.getElementById('pad').style.fontFamily=document.getElementById('fontfamily').value;
		document.getElementById('padnumbers').style.fontFamily=document.getElementById('fontfamily').value;
}
function fontSize()
{
		document.getElementById("pad").style.fontSize=document.getElementById('fontsize').value;
		document.getElementById("padnumbers").style.fontSize=document.getElementById('fontsize').value;
}
// Enhanced formatting functions with toggle capability
let formatState = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false
};

function toggleBold() {
    formatState.bold = !formatState.bold;
    const weight = formatState.bold ? "bold" : "normal";
    document.getElementById("pad").style.fontWeight = weight;
    document.getElementById("padnumbers").style.fontWeight = weight;
    updateFormatButton('bold-btn', formatState.bold);
}

function toggleItalic() {
    formatState.italic = !formatState.italic;
    const style = formatState.italic ? "italic" : "normal";
    document.getElementById("pad").style.fontStyle = style;
    document.getElementById("padnumbers").style.fontStyle = style;
    updateFormatButton('italic-btn', formatState.italic);
}

function toggleUnderline() {
    formatState.underline = !formatState.underline;
    updateTextDecoration();
    updateFormatButton('underline-btn', formatState.underline);
}

function toggleStrike() {
    formatState.strikethrough = !formatState.strikethrough;
    updateTextDecoration();
    updateFormatButton('strike-btn', formatState.strikethrough);
}

function updateTextDecoration() {
    let decoration = [];
    if (formatState.underline) decoration.push('underline');
    if (formatState.strikethrough) decoration.push('line-through');
    
    const decorationValue = decoration.length > 0 ? decoration.join(' ') : 'none';
    document.getElementById("pad").style.textDecoration = decorationValue;
    document.getElementById("padnumbers").style.textDecoration = decorationValue;
}

function updateFormatButton(buttonId, isActive) {
    const button = document.getElementById(buttonId);
    if (button) {
        if (isActive) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
}

// Legacy functions for backward compatibility
function bold()
{
		document.getElementById("pad").style.fontWeight="bold";
		document.getElementById("padnumbers").style.fontWeight="bold";
}
function italics()
{
		document.getElementById("pad").style.fontStyle="italic";
		document.getElementById("padnumbers").style.fontStyle="italic";
}


function read()
{
	var find=document.getElementById('pad').value;
	for(var i=0;i<find.length;i++)
	{
		if(find.charAt(i)=='\n')
		{
				if(localStorage.padnumbers==0) // if first time pressed
				{
			document.getElementById('padnumbers').value=localStorage.padnumbers;		// set 0 at first place
			localStorage.padnumbers=parseInt(localStorage.padnumbers)+1					// increase local variable
			document.getElementById('padnumbers').value=document.getElementById('padnumbers').value+'\n'+localStorage.padnumbers;		
					// after setting to zero put a new line
				}
				else
				{			// after zero has been set keep on adding the local variable so that it return 0 1 2 with /n and so on
					document.getElementById('padnumbers').value=document.getElementById('padnumbers').value+'\n'+localStorage.padnumbers;
				}
				localStorage.padnumbers=parseInt(localStorage.padnumbers)+1;	
		 // increase local variable by 1

				document.getElementById('padnumbers').scrollTop=localStorage.padnumbers+1;
		
		
		}
	}

}

// Text alignment functions
function alignText(alignment) {
    document.getElementById("pad").style.textAlign = alignment;
}

// Color functions
function setTextColor(color) {
    document.getElementById("pad").style.color = color;
}

function setBgColor(color) {
    document.getElementById("pad").style.backgroundColor = color;
}

// File operations
function saveFile() {
    const content = document.getElementById('pad').value;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Undo/Redo functionality
let undoStack = [];
let redoStack = [];
let lastContent = '';

function saveState() {
    const currentContent = document.getElementById('pad').value;
    if (currentContent !== lastContent) {
        undoStack.push(lastContent);
        if (undoStack.length > 50) {
            undoStack.shift(); // Keep only last 50 states
        }
        redoStack = []; // Clear redo stack when new change is made
        lastContent = currentContent;
    }
}

function undo() {
    if (undoStack.length > 0) {
        const currentContent = document.getElementById('pad').value;
        redoStack.push(currentContent);
        const previousContent = undoStack.pop();
        document.getElementById('pad').value = previousContent;
        lastContent = previousContent;
        updateWordCount();
        recalculateLineNumbers();
    }
}

function redo() {
    if (redoStack.length > 0) {
        const currentContent = document.getElementById('pad').value;
        undoStack.push(currentContent);
        const nextContent = redoStack.pop();
        document.getElementById('pad').value = nextContent;
        lastContent = nextContent;
        updateWordCount();
        recalculateLineNumbers();
    }
}

// Enhanced line numbering functions
function resetLineNumbers() {
    localStorage.padnumbers = 0;
    document.getElementById('padnumbers').value = '0';
}

function updateWordCount() {
    const words = document.getElementById('pad').value;
    let chars = 0;
    let space = 0;
    let w = 0;
    
    for (let i = 0; i < words.length; i++) {
        if (words.charAt(i) == ' ') {
            if (words.charAt(i-1) != ' ') {
                space = space + 1;
            }
        }
        w = space + 1;

        if (words.charAt(i) == ' ' || words.charAt(i) == '\t' || words.charAt(i) == '\n') {
            // Don't count whitespace
        } else {
            chars = chars + 1;
        }
    }
    
    if (words.length === 0) {
        w = 0;
    }
    
    document.getElementById('chars').value = chars;
    document.getElementById('words').value = w;
}

function recalculateLineNumbers() {
    const content = document.getElementById('pad').value;
    const lines = content.split('\n').length;
    let numberString = '';
    
    for (let i = 0; i < lines; i++) {
        numberString += i + (i < lines - 1 ? '\n' : '');
    }
    
    document.getElementById('padnumbers').value = numberString;
    localStorage.padnumbers = lines;
}

// Find and Replace functionality
function findText(forward = true) {
    const searchTerm = document.getElementById('find-input').value;
    const textarea = document.getElementById('pad');
    const text = textarea.value;
    
    if (!searchTerm) return;
    
    const matchCase = document.getElementById('match-case').checked;
    const wholeWord = document.getElementById('whole-word').checked;
    
    let searchText = matchCase ? text : text.toLowerCase();
    let searchFor = matchCase ? searchTerm : searchTerm.toLowerCase();
    
    if (wholeWord) {
        searchFor = '\\b' + searchFor + '\\b';
    }
    
    const regex = new RegExp(searchFor, 'g' + (matchCase ? '' : 'i'));
    const matches = [...searchText.matchAll(regex)];
    
    if (matches.length === 0) {
        document.getElementById('find-results').textContent = 'No matches found';
        return;
    }
    
    if (forward) {
        currentSearchIndex = (currentSearchIndex + 1) % matches.length;
    } else {
        currentSearchIndex = currentSearchIndex <= 0 ? matches.length - 1 : currentSearchIndex - 1;
    }
    
    const match = matches[currentSearchIndex];
    textarea.focus();
    textarea.setSelectionRange(match.index, match.index + match[0].length);
    
    document.getElementById('find-results').textContent = 
        `Match ${currentSearchIndex + 1} of ${matches.length}`;
}

function replaceText(replaceAll = false) {
    const searchTerm = document.getElementById('find-input').value;
    const replaceTerm = document.getElementById('replace-input').value;
    const textarea = document.getElementById('pad');
    
    if (!searchTerm) return;
    
    saveState(); // Save current state for undo
    
    const matchCase = document.getElementById('match-case').checked;
    const wholeWord = document.getElementById('whole-word').checked;
    
    let flags = 'g' + (matchCase ? '' : 'i');
    let searchFor = searchTerm;
    
    if (wholeWord) {
        searchFor = '\\b' + searchFor + '\\b';
    }
    
    const regex = new RegExp(searchFor, flags);
    
    if (replaceAll) {
        const newText = textarea.value.replace(regex, replaceTerm);
        const matchCount = (textarea.value.match(regex) || []).length;
        textarea.value = newText;
        document.getElementById('find-results').textContent = 
            `Replaced ${matchCount} occurrence(s)`;
    } else {
        // Replace only the currently selected text if it matches
        const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        if (regex.test(selectedText)) {
            const before = textarea.value.substring(0, textarea.selectionStart);
            const after = textarea.value.substring(textarea.selectionEnd);
            textarea.value = before + replaceTerm + after;
            document.getElementById('find-results').textContent = 'Replaced 1 occurrence';
        }
    }
    
    updateWordCount();
    recalculateLineNumbers();
}

function highlightAllMatches() {
    // This would need a more complex implementation with overlays
    // For now, just update the results count
    const searchTerm = document.getElementById('find-input').value;
    if (!searchTerm) return;
    
    const text = document.getElementById('pad').value;
    const matchCase = document.getElementById('match-case').checked;
    const wholeWord = document.getElementById('whole-word').checked;
    
    let flags = 'g' + (matchCase ? '' : 'i');
    let searchFor = searchTerm;
    
    if (wholeWord) {
        searchFor = '\\b' + searchFor + '\\b';
    }
    
    const regex = new RegExp(searchFor, flags);
    const matches = text.match(regex) || [];
    
    document.getElementById('find-results').textContent = 
        `${matches.length} match(es) found`;
}

function clearHighlights() {
    document.getElementById('find-results').textContent = '';
    currentSearchIndex = -1;
}

// Initialize state tracking on pad changes
document.addEventListener('DOMContentLoaded', function() {
    const pad = document.getElementById('pad');
    if (pad) {
        lastContent = pad.value;
        
        // Track changes for undo/redo
        let changeTimer;
        pad.addEventListener('input', function() {
            clearTimeout(changeTimer);
            changeTimer = setTimeout(saveState, 1000); // Save state after 1 second of no changes
        });
        
        // Update word count on input
        pad.addEventListener('input', updateWordCount);
    }
});
