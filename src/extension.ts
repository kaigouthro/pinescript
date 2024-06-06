import * as vscode from 'vscode';
import * as hover_func from './hover_built-in_functions.json';
import * as hover_var from './hover_built-in_variables.json';
import * as hover_const from './hover_built-in_constants.json';
import * as hover_type from './hover_built-in_types.json';

type Params = {
	field: string;
	description: string;
};

type FuncPopupBlock = {
	pattern: string;
	codeblock: string[];
	markdown: string;
	returns: string;
	manual: string;
	param: Params[];
};

type ConstPopupBlock = {
	pattern: string;
	codeblock: string;
	markdown: string;
	descLink: string[];
	remark: string[];
	remarkLink: string[];
	type: string;
	manual: string;
};

type TypePopupBlock = {
	pattern: string;
	codeblock: string;
	description: string;
	descLink: string[];
	remark: string[];
	remarkLink: string[];
	manual: string;
	fields: Params[];
};

const BUILT_IN_FUNC = hover_func as FuncPopupBlock[];
const BUILT_IN_VAR = hover_var as ConstPopupBlock[];
const BUILT_IN_CONST = hover_const as ConstPopupBlock[];
const BUILT_IN_TYPE = hover_type as TypePopupBlock[];

// format links
function linksFormat(source: string, stringArr: any[]){
	// store arguments in an array
	var args = stringArr;
	// use replace to iterate over the string
	// select the match and check if the related argument is present
	// if yes, replace the match with the argument
	return source.replace(/{([0-9]+)}/g, function (match, index) {
	  // check if the argument is present
		return typeof args[index] === "undefined" ? match : "("+args[index]+")";
	});
}

function applyLinks(source: string, stringArr: any[]): string {
	let outputStr = source;
	if (!stringArr){
		return outputStr;
	}
	if (stringArr.length > 0){
		outputStr = linksFormat(outputStr, stringArr);
	}
	return outputStr;
}

function testComment(document: vscode.TextDocument, position: vscode.Position, hoverLineText: string){
	let testCommentPattern = new RegExp("//.*");
		if (testCommentPattern.test(hoverLineText)){
			let hoverRange = document.getWordRangeAtPosition(position, testCommentPattern);
			if (hoverRange){
				return true;
			}
			else {
				return false;
			}
		}
}

function testString(document: vscode.TextDocument, position: vscode.Position, hoverLineText: string){
	let testStringPattern = new RegExp("(?:(?:^|[^\\s\\w\\)\\}\\.\\-\\~\\:\\`\\\\])\\s*\".*?\"\\s*(?:[^\\s\\w\\(\\{\\-\\~\\:\\`\\\\]|$))|(?:(?:^|[^\\s\\w\\)\\}\\.\\-\\~\\:\\`\\\\])\\s*'.*?'\\s*(?:[^\\s\\w\\(\\{\\-\\~\\:\\`\\\\]|$))");
		if (testStringPattern.test(hoverLineText)){
			let hoverRange = document.getWordRangeAtPosition(position, testStringPattern);
			if (hoverRange){
				return true;
			}
			else {
				return false;
			}
		}
}

export function activate(context: vscode.ExtensionContext) {

	console.log('Pinescript-helper activated');


	let pineFuncHover = vscode.languages.registerHoverProvider('pine', {
		provideHover(document, position, token) {
			let hoverRange;
			const hoverLineText = document.lineAt(position.line).text;

			if (testComment(document, position, hoverLineText) || testString(document, position, hoverLineText)){
				return null;
			}

			for (let index = 0; index < BUILT_IN_FUNC.length; index++) {
				let testPattern = new RegExp(BUILT_IN_FUNC[index].pattern);
				if (testPattern.test(hoverLineText)) {
					hoverRange = document.getWordRangeAtPosition(position, testPattern);
					if (hoverRange) {
						let popup = new vscode.MarkdownString('');
						let codeBlockStr = " (function) " + BUILT_IN_FUNC[index].codeblock[0];
						for (let codeBlockCounter = 1; codeBlockCounter < BUILT_IN_FUNC[index].codeblock.length; codeBlockCounter++){
							codeBlockStr = codeBlockStr + "\n (function) " + BUILT_IN_FUNC[index].codeblock[codeBlockCounter];
						}
						popup.appendCodeblock(codeBlockStr);
						if (BUILT_IN_FUNC[index].markdown !== ''){
							popup.appendMarkdown(BUILT_IN_FUNC[index].markdown);
						}
						if (BUILT_IN_FUNC[index].param.length > 0){
							popup.appendMarkdown("<h4>ARGUMENTS</h4>");
							for (let i = 0; i < BUILT_IN_FUNC[index].param.length; i++) {
								popup.appendMarkdown("<ul><li>__"+BUILT_IN_FUNC[index].param[i].field+"__ — "+BUILT_IN_FUNC[index].param[i].description+"</li></ul>");
							}
						}
						if (BUILT_IN_FUNC[index].returns !== ''){
							popup.appendMarkdown("<h4>RETURNS</h4><ul><li>"+BUILT_IN_FUNC[index].returns+"</li></ul>");
						}
						if (BUILT_IN_FUNC[index].manual !== ''){
							popup.appendMarkdown("<p>*[Jump to reference manual]("+BUILT_IN_FUNC[index].manual+")*</p>");
						}
						popup.isTrusted = true;
						popup.supportHtml = true;
						return new vscode.Hover(popup, new vscode.Range(position, position));
					}
				}
			}
			return null;
		}
	});
	context.subscriptions.push(pineFuncHover); 



	let pineVarHover = vscode.languages.registerHoverProvider('pine', {
		provideHover(document, position, token) {
			let hoverRange;
			const hoverLineText = document.lineAt(position.line).text;

			if (testComment(document, position, hoverLineText) || testString(document, position, hoverLineText)){
				return null;
			}

			for (let index = 0; index < BUILT_IN_VAR.length; index++) {
				let testPattern = new RegExp(BUILT_IN_VAR[index].pattern);
				if (testPattern.test(hoverLineText)) {
					hoverRange = document.getWordRangeAtPosition(position, testPattern);
					if (hoverRange) {
						let popup = new vscode.MarkdownString('');
						popup.appendCodeblock(" (variable) " + BUILT_IN_VAR[index].codeblock);
						if (BUILT_IN_VAR[index].markdown !== ''){
							let descStr = BUILT_IN_VAR[index].markdown;
							descStr = applyLinks(descStr, BUILT_IN_VAR[index].descLink);
							popup.appendMarkdown(descStr);
						}
						if (BUILT_IN_VAR[index].type !== ''){
							popup.appendMarkdown("<h3>TYPE</h3> <ul><li>__"+BUILT_IN_VAR[index].type+"__</li></ul>");
						}
						if (BUILT_IN_VAR[index].remark){
							if (BUILT_IN_VAR[index].remark.length > 0){
								let remarkStr = BUILT_IN_VAR[index].remark[0];
								remarkStr = applyLinks(remarkStr, BUILT_IN_VAR[index].remarkLink);
								popup.appendMarkdown("<h3>REMARKS</h3>"+remarkStr);
							}
						}
						if (BUILT_IN_VAR[index].manual !== ''){
							popup.appendMarkdown("<p>*[Jump to reference manual]("+BUILT_IN_VAR[index].manual+")*</p>");
						}
						popup.isTrusted = true;
						popup.supportHtml = true;
						return new vscode.Hover(popup, new vscode.Range(position, position));
					}
				}
			}
			return null;
		}
	});
	context.subscriptions.push(pineVarHover); 



	let pineConstHover = vscode.languages.registerHoverProvider('pine', {
		provideHover(document, position, token) {
			let hoverRange;
			const hoverLineText = document.lineAt(position.line).text;

			if (testComment(document, position, hoverLineText) || testString(document, position, hoverLineText)){
				return null;
			}

			for (let index = 0; index < BUILT_IN_CONST.length; index++) {
				let testPattern = new RegExp(BUILT_IN_CONST[index].pattern);
				if (testPattern.test(hoverLineText)) {
					hoverRange = document.getWordRangeAtPosition(position, testPattern);
					if (hoverRange) {
						let popup = new vscode.MarkdownString('');
						popup.appendCodeblock(" (constant) " + BUILT_IN_CONST[index].codeblock);
						if (BUILT_IN_CONST[index].markdown !== ''){
							let descStr = BUILT_IN_CONST[index].markdown;
							descStr = applyLinks(descStr, BUILT_IN_CONST[index].descLink);
							popup.appendMarkdown(descStr);
						}
						if (BUILT_IN_CONST[index].type !== ''){
							popup.appendMarkdown("<h3>TYPE</h3> <ul><li>__"+BUILT_IN_CONST[index].type+"__</li></ul>");
						}
						if (BUILT_IN_CONST[index].remark){
							if (BUILT_IN_CONST[index].remark.length > 0){
								let remarkStr = BUILT_IN_CONST[index].remark[0];
								remarkStr = applyLinks(remarkStr, BUILT_IN_CONST[index].remarkLink);
								popup.appendMarkdown("<h3>REMARKS</h3>"+remarkStr);
							}
						}
						if (BUILT_IN_CONST[index].manual !== ''){
							popup.appendMarkdown("<p>*[Jump to reference manual]("+BUILT_IN_CONST[index].manual+")*</p>");
						}
						popup.isTrusted = true;
						popup.supportHtml = true;
						return new vscode.Hover(popup, new vscode.Range(position, position));
					}
				}
			}
			return null;
		}
	});
	context.subscriptions.push(pineConstHover); 


	
	let pineTypeHover = vscode.languages.registerHoverProvider('pine', {
		provideHover(document, position, token) {
			let hoverRange;
			const hoverLineText = document.lineAt(position.line).text;

			if (testComment(document, position, hoverLineText) || testString(document, position, hoverLineText)){
				return null;
			}

			for (let index = 0; index < BUILT_IN_TYPE.length; index++) {
				let testPattern = new RegExp(BUILT_IN_TYPE[index].pattern);
				if (testPattern.test(hoverLineText)) {
					hoverRange = document.getWordRangeAtPosition(position, testPattern);
					if (hoverRange) {
						let popup = new vscode.MarkdownString('');
						popup.appendCodeblock(" (type) " + BUILT_IN_TYPE[index].codeblock);
						if (BUILT_IN_TYPE[index].description !== ''){
							let descStr = BUILT_IN_TYPE[index].description;
							descStr = applyLinks(descStr, BUILT_IN_TYPE[index].descLink);
							popup.appendMarkdown(descStr);
						}
						if (BUILT_IN_TYPE[index].remark){
							if (BUILT_IN_TYPE[index].remark.length > 0){
								let remarkStr = BUILT_IN_TYPE[index].remark[0];
								remarkStr = applyLinks(remarkStr, BUILT_IN_TYPE[index].remarkLink);
								popup.appendMarkdown("<h3>REMARKS</h3>"+remarkStr);
							}
						}
						if (BUILT_IN_TYPE[index].fields.length > 0){
							popup.appendMarkdown("<h3>FIELDS</h3>");
							for (let i = 0; i < BUILT_IN_TYPE[index].fields.length; i++) {
								popup.appendMarkdown("<ul><li>__"+BUILT_IN_TYPE[index].fields[i].field+"__ — "+BUILT_IN_TYPE[index].fields[i].description+"</li></ul>");
							}
						}
						if (BUILT_IN_TYPE[index].manual !== ''){
							popup.appendMarkdown("<p>*[Jump to reference manual]("+BUILT_IN_TYPE[index].manual+")*</p>");
						}
						popup.isTrusted = true;
						popup.supportHtml = true;
						return new vscode.Hover(popup, new vscode.Range(position, position));
					}
				}
			}
			return null;
		}
	});
	context.subscriptions.push(pineTypeHover); 
}

// this method is called when your extension is deactivated
export function deactivate() {}
