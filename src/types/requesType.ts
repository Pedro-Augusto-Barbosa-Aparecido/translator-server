export type WordCreate = {
    word: string
    translate: string
    examples: Array<ExampleCreate>
    sep_sila?: string

}

export type ExampleCreate = {
    example: string
    reference: string

}

export type Word = {
    id: String
    word: String
    translate: String
    examples?: Array<ExampleCreate>
    sep_sila?: String


}

export type WordBatchCreate = {
    words: Array<WordCreate>

}
