type TokenType = 'word' | 'separator'

type TokenStage = 'not-hidden' | 'partly-hidden' | 'fully-hidden'

type TextToken = {
  id: string,
  type: TokenType,
  content: string,
  stage?: TokenStage,
}

export default TextToken
