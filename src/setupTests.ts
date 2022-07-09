import { jestPreviewConfigure } from 'jest-preview'

import '@testing-library/jest-dom/extend-expect'

jestPreviewConfigure({
 autoPreview: true,
})

window.matchMedia = (query) => ({
 matches: false,
 media: query,
 onchange: null,
 addEventListener: jest.fn(),
 removeEventListener: jest.fn(),
 dispatchEvent: jest.fn(),
 addListener: jest.fn(),
 removeListener: jest.fn(),
})

Object.defineProperty(URL, 'createObjectURL', {
 writable: true,
 value: jest.fn(),
})
