import { customAlphabet } from 'nanoid'


export const useId = () => {
    const generate = customAlphabet('1234567890abcdef', 10)

    return {
        generate
    }
}