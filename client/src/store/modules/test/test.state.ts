import { ITestState as State } from './test.types'

export function getDefaultState(): State
{
    const s: State = {
        data: null

    }

    return s
}

const state = getDefaultState()

export default state