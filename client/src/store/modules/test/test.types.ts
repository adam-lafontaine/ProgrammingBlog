//= ====== FUNCTION ENUMS ======================

export const enum TestAction {
    LOAD_TEST_DATA = "loadTestData",
    SET_TEST_DATA = "setTestData",
}

export const enum TestGet {
    GET_TEST_DATA = "getTestData"
}

export const enum TestMutation {
    SET_TEST_DATA = "setTestData"
}

// ^^^^^^^ FUNCTION ENUMS ^^^^^^^^^^^^^^^^^^^^^^

export interface ITestState {
    data: any
}