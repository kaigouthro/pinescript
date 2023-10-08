import * as vscode from 'vscode';
import * as hover_func from './hover_built-in_functions.json';
import * as var_func from './hover_built-in_variables.json';
import * as const_func from './hover_built-in_constants.json';

type Params = {
	field: string;
	description: string;
};

type FuncPopupBlock = {
	id: number;
	pattern: string;
	codeblock: string;
	markdown: string;
	returns: string;
	manual: string;
	param: Params[];
};

type ConstPopupBlock = {
	id: number;
	pattern: string;
	codeblock: string;
	markdown: string;
	type: string;
	manual: string;
};

const BUILT_IN_FUNC = hover_func as FuncPopupBlock[];
const BUILT_IN_VAR = var_func as ConstPopupBlock[];
const BUILT_IN_CONST = const_func as ConstPopupBlock[];

export function activate(context: vscode.ExtensionContext) {

	console.log('Pinescript-helper activated');


	let pineFuncHover = vscode.languages.registerHoverProvider('pine', {
		provideHover(document, position, token) {
			let hoverRange;
			const hoverLineText = document.lineAt(position.line).text;

			for (let index = 0; index < BUILT_IN_FUNC.length; index++) {
				let testPattern = new RegExp(BUILT_IN_FUNC[index].pattern);
				if (testPattern.test(hoverLineText)) {
					hoverRange = document.getWordRangeAtPosition(position, testPattern);
					if (hoverRange) {
						let popup = new vscode.MarkdownString('');
						popup.appendCodeblock(BUILT_IN_FUNC[index].codeblock);
						if (BUILT_IN_FUNC[index].markdown !== ''){
							popup.appendMarkdown(BUILT_IN_FUNC[index].markdown);
						}
						if (BUILT_IN_FUNC[index].param !== null){
							for (let i = 0; i < BUILT_IN_FUNC[index].param.length; i++) {
								popup.appendMarkdown("<p/>*@param* __"+BUILT_IN_FUNC[index].param[i].field+"__ — "+BUILT_IN_FUNC[index].param[i].description);
							}
						}
						if (BUILT_IN_FUNC[index].returns !== ''){
							popup.appendMarkdown("<p/>*@returns* — "+BUILT_IN_FUNC[index].returns);
						}
						if (BUILT_IN_FUNC[index].manual !== ''){
							popup.appendMarkdown("<p/>*[Jump to reference manual]("+BUILT_IN_FUNC[index].manual+")*");
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

			for (let index = 0; index < BUILT_IN_VAR.length; index++) {
				let testPattern = new RegExp(BUILT_IN_VAR[index].pattern);
				if (testPattern.test(hoverLineText)) {
					hoverRange = document.getWordRangeAtPosition(position, testPattern);
					if (hoverRange) {
						let popup = new vscode.MarkdownString('');
						popup.appendCodeblock(BUILT_IN_VAR[index].codeblock);
						if (BUILT_IN_VAR[index].markdown !== ''){
							popup.appendMarkdown(BUILT_IN_VAR[index].markdown);
						}
						if (BUILT_IN_VAR[index].type !== ''){
							popup.appendMarkdown("<p/>*@type* — __"+BUILT_IN_VAR[index].type+"__");
						}
						if (BUILT_IN_VAR[index].manual !== ''){
							popup.appendMarkdown("<p/>*[Jump to reference manual]("+BUILT_IN_VAR[index].manual+")*");
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

			for (let index = 0; index < BUILT_IN_CONST.length; index++) {
				let testPattern = new RegExp(BUILT_IN_CONST[index].pattern);
				if (testPattern.test(hoverLineText)) {
					hoverRange = document.getWordRangeAtPosition(position, testPattern);
					if (hoverRange) {
						let popup = new vscode.MarkdownString('');
						popup.appendCodeblock(BUILT_IN_CONST[index].codeblock);
						if (BUILT_IN_CONST[index].markdown !== ''){
							popup.appendMarkdown(BUILT_IN_CONST[index].markdown);
						}
						if (BUILT_IN_CONST[index].type !== ''){
							popup.appendMarkdown("<p/>*@type* — __"+BUILT_IN_CONST[index].type+"__");
						}
						if (BUILT_IN_CONST[index].manual !== ''){
							popup.appendMarkdown("<p/>*[Jump to reference manual]("+BUILT_IN_CONST[index].manual+")*");
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
}

// this method is called when your extension is deactivated
export function deactivate() {}
