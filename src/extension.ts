/* ***************************************************************************** */
/*                                                          __  __ ____  _  __   */
/*                                                         / / / // __ \| |/ /   */
/*   extension.ts                                         / / / // / / /|   /    */
/*                                                       / /_/ // /_/ //   |     */
/*   By: 0xTokkyo                                        \____//_____//_/|_|     */
/*                                                                               */
/*   Created: 2025-10-04 00:14:08 by 0xTokkyo                                    */
/*   Updated: 2025-10-04 00:14:17 by 0xTokkyo                                    */
/*                                                                               */
/* ***************************************************************************** */

import * as vscode from 'vscode'
import { languageDelimiters } from './delimiters'

function nowString(): string {
  const d = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function getCommentStyle(languageId: string): { start: string; line: string; end: string } {
  const delimiters = languageDelimiters[languageId]

  if (delimiters) {
    const [prefix, suffix] = delimiters
    return { start: '', line: prefix, end: suffix }
  }

  return { start: '', line: '# ', end: ' #' }
}

function buildHeader(
  filename: string,
  githubUser: string,
  created: string | null,
  style: { start: string; line: string; end: string }
): string {
  const createdLine = created ?? nowString()
  const updatedLine = nowString()

  const lines = [
    ' ***************************************************************************** ',
    '                                                          __  __ ____  _  __   ',
    '                                                         / / / // __ \\| |/ /   ',
    `   ${filename.padEnd(50)}   / / / // / / /|   /    `,
    '                                                       / /_/ // /_/ //   |     ',
    `   By: ${githubUser.padEnd(42)}      \\____//_____//_/|_|     `,
    '                                                                               ',
    `   Created: ${createdLine} by ${githubUser.padEnd(44)}`,
    `   Updated: ${updatedLine} by ${githubUser.padEnd(44)}`,
    '                                                                               ',
    ' ***************************************************************************** '
  ]

  let result = ''
  if (style.start) result += style.start + '\n'
  result += lines.map((l) => style.line + l + style.end).join('\n')
  return result + '\n\n'
}

function extractHeaderRanges(
  text: string,
  style: { start: string; line: string; end: string }
): { start: number; end: number; created: string | null; githubUser: string | null } | null {
  const marker =
    style.line +
    ' ***************************************************************************** ' +
    style.end
  const firstMarkerIdx = text.indexOf(marker)
  if (firstMarkerIdx === -1) return null

  const secondMarkerIdx = text.indexOf(marker, firstMarkerIdx + marker.length)
  if (secondMarkerIdx === -1) return null

  let headerStart = firstMarkerIdx
  if (style.start) {
    const startDelimiter = text.lastIndexOf(style.start, firstMarkerIdx)
    if (startDelimiter !== -1) {
      headerStart = startDelimiter
    }
  }

  let headerEnd = secondMarkerIdx + marker.length
  if (style.end) {
    const endDelimiter = text.indexOf(style.end, secondMarkerIdx)
    if (endDelimiter !== -1) {
      headerEnd = endDelimiter + style.end.length
    }
  }

  while (headerEnd < text.length && text[headerEnd] === '\n') {
    headerEnd++
  }

  const headerText = text.substring(headerStart, headerEnd)
  const createdMatch = headerText.match(/Created:\s*([0-9\-:\s]+)\s*by\s*(\S+)/)
  const created = createdMatch ? createdMatch[1].trim() : null
  const githubMatch = headerText.match(/By:\s*(\S+)/)
  const githubUser = githubMatch ? githubMatch[1].trim() : null

  return { start: headerStart, end: headerEnd, created, githubUser }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('UDX Header extension active')

  const config = vscode.workspace.getConfiguration()

  const setGithubUser = vscode.commands.registerCommand('udxHeader.setGithubUser', async () => {
    const value = await vscode.window.showInputBox({
      prompt: 'GitHub username to show in file header',
      value: config.get<string>('udxHeader.githubUser') || ''
    })
    if (value !== undefined) {
      await config.update('udxHeader.githubUser', value, vscode.ConfigurationTarget.Global)
      vscode.window.showInformationMessage(`UDX Header: github user set to ${value}`)
    }
  })

  const insertHeader = vscode.commands.registerCommand('udxHeader.insertHeader', async () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found')
      return
    }

    const doc = editor.document
    const text = doc.getText()
    const filename = doc.fileName.split('/').pop() || doc.fileName
    const githubUser = config.get<string>('udxHeader.githubUser') || '0xTokkyo'
    const style = getCommentStyle(doc.languageId)

    const existing = extractHeaderRanges(text, style)

    if (existing) {
      vscode.window.showInformationMessage('UDX Header already exists in this file.')
      return
    }

    const newHeader = buildHeader(filename, githubUser, null, style)

    try {
      await editor.edit((editBuilder) => {
        editBuilder.insert(new vscode.Position(0, 0), newHeader)
      })
    } catch (err) {
      vscode.window.showErrorMessage('Error adding UDX header')
      console.error('UDX Header insertion failed:', err)
    }
  })

  context.subscriptions.push(setGithubUser, insertHeader)

  const willSave = vscode.workspace.onWillSaveTextDocument(
    async (e: vscode.TextDocumentWillSaveEvent) => {
      try {
        const doc = e.document
        const text = doc.getText()
        const filename = doc.fileName.split('/').pop() || doc.fileName
        const githubUser = config.get<string>('udxHeader.githubUser') || '0xTokkyo'
        const style = getCommentStyle(doc.languageId)

        const existing = extractHeaderRanges(text, style)

        if (existing) {
          const updatedHeader = buildHeader(filename, githubUser, existing.created, style)

          const edits = [
            vscode.TextEdit.replace(
              new vscode.Range(doc.positionAt(existing.start), doc.positionAt(existing.end)),
              updatedHeader
            )
          ]
          e.waitUntil(Promise.resolve(edits))
        }
      } catch (err) {
        console.error('UDX Header failed to update on save:', err)
      }
    }
  )

  context.subscriptions.push(willSave)
}

export function deactivate() {}
