import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';

if (!localStorage.getItem('sandy-store:n7m4v1')) {
  localStorage.setItem(
    'sandy-store:n7m4v1',
    JSON.stringify({
      state: {
        theme: 'light',
        currentSnippetId: 'c02e54f0-c028-4b3c-90a6-bf262d3f585f',
        snippets: [
          {
            id: 'c758165f-8584-4975-b720-12d69e12549c',
            title: 'Fibonacci recursive',
            code: "function fibonacciRecursive(n) {\n  v('n', n);\n  function recurssion(n){\n     if (n < 2) {\n    return n;\n  }\n     return recurssion(n - 2) + recurssion(n - 1);\n  }\n\n  const result = recurssion(n);\n  v('result', result);\n}\n",
            input: '10'
          },
          {
            id: '11b54f18-812f-4b80-8583-b6c0eea89906',
            title: 'Fibonacci DP',
            code: "function fibonacci(n) {\n  if (n < 2) {\n    return n;\n  }\n\n  const memo = new Array(n + 1); // Create an array to store calculated values\n  memo[0] = 0;\n  memo[1] = 1;\n\n  for (let i = 2; i <= n; i++) {\n    // Calculate fibonacci(i) using previously computed values\n    memo[i] = memo[i - 1] + memo[i - 2];\n  }\n  v('dp', memo);\n  v('result', memo[n])\n  return memo[n];\n}\n",
            input: '12'
          },
          {
            id: '4091d79c-59e1-4d56-955f-fa7a26ddfb38',
            title: 'LPS Brute Force',
            code: "function palindrom(s) {\n  // s = new Array(200).join('a');\n  const startTime = performance.now();\n  v('start', s);\n  function isPalindrome(s) {\n    let start = 0;\n    let end = s.length - 1;\n    while (start < end) {\n      v('isPalindrome loop', {start : s[start], end: s[end]})\n      if (s[start] !== s[end]) {\n        return false;\n      }\n      start++;\n      end--;\n    }\n    return true;\n  }\n  \n  let maxLength = 0;\n  let longestPalindrome = '';\n\n  for (let i = 0; i < s.length; i++) {\n    for (let j = i + 1; j <= s.length; j++) {\n      let substring = s.slice(i, j);\n      v('substring', {start:s[i], end:s[j-1], substring});\n      if (isPalindrome(substring) && substring.length > maxLength) {\n        maxLength = substring.length;\n        longestPalindrome = substring;\n      }\n    }\n  }\n  \n  const endTime = performance.now();\n  const executionTimeInSeconds = ((endTime - startTime) / 1000).toFixed(4);\n  v('result', longestPalindrome);\n  v('time', {executionTimeInSeconds})\n\n  return longestPalindrome;\n}",
            input: '"babad"'
          },
          {
            id: '32ac30bb-1103-4c77-897d-44ca348e4545',
            title: 'LPS DP',
            code: "function longestPalindrome(s) {\n  // s = new Array(11_000).join('a');\n  const startTime = performance.now();\n  const n = s.length;\n  if (n <= 1) return s;\n\n  let start = 0;\n  let maxLength = 1;\n\n  const dp = Array.from({ length: n }, () => Array(n).fill(false));\n\n  // All substrings with length 1 are palindromes\n  for (let i = 0; i < n; i++) {\n    dp[i][i] = true;\n  }\n  v('start', [[0,...s.split(\"\")],...dp.map((row,i) => [s[i], ...row]) ]);\n\n  // Check all substring lengths from 2 to n\n  for (let len = 2; len <= n; len++) {\n    for (let i = 0; i <= n - len; i++) {\n      const j = i + len - 1;\n\n      // Check if substring is palindrome\n      if (s[i] === s[j] && (len === 2 || dp[i + 1][j - 1])) {\n        dp[i][j] = true;\n\n        if (len > maxLength) {\n          maxLength = len;\n          start = i;\n        }\n      }\n      v('loop', {len, i, j, iS: s[i], jS:s[j], prev: dp[i + 1][j - 1] });\n      v('dp', [[0,...s.split(\"\")],...dp.map((row,i) => [s[i], ...row]) ]);\n    }\n\n  }\n  v('data', {start, maxLength})\n  v('end', [[0,...s.split(\"\")],...dp.map((row,i) => [s[i], ...row]) ]);\n  const endTime = performance.now();\n  const executionTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);\n  const result =  s.substring(start, start + maxLength);\n  v('result', result);\n  v('time', {executionTimeInSeconds})\n  return result;\n}\n",
            input: '"babad"'
          },
          {
            id: 'c02e54f0-c028-4b3c-90a6-bf262d3f585f',
            title: "LPS Manacher's algorithm",
            code: "function palidnrom(s) {\n  // s = new Array(10_000_000).join('a');\n  const startTime = performance.now();\n\n \n  // Create a modified string by inserting '#' between characters and at both ends\n  const modifiedStringArr = `#${s.split('').join('#')}#`.split('');\n\n  // Array P will hold the lengths of the palindromes centered at each position\n  const P = new Array(modifiedStringArr.length).fill(0);\n  \n  // C is the center of the rightmost palindrome, R is its right boundary\n  let C = 0;\n  let R = 0;\n  v('str', [modifiedStringArr, P]);\n  // Loop through each position in the modified string (excluding the first and last characters)\n  v('algo', {center: C,rightBoundary:R, currentElementIdx: 1, mirrorOfCurrentIdx: 2 * C - 1,currentElement: modifiedStringArr[1],\nmirrorElement: '',\n  })\n  for (let i = 1; i < modifiedStringArr.length - 1; i++) {\n    // iMirror is the mirror position of i with respect to the center C\n    const iMirror = 2 * C - i;\n\n   // If the current position is within the rightmost palindrome,\n   // use the mirror position to find the minimum radius\n    if (R > i) {\n      P[i] = Math.min(R - i, P[iMirror]);\n    }\n    \n    while (\n    // Check if the next position on the right is within bounds\n      i + P[i] + 1 < modifiedStringArr.length &&\n    // Check if the next position on the left is within bounds\n      i - (P[i] + 1) >= 0 &&\n    // Check if the characters at the next positions on the right and left are the same\n      modifiedStringArr[i + (P[i] + 1)] === modifiedStringArr[i - (P[i] + 1)]\n    ) {\n    // Increment the palindrome radius as long as the above conditions hold true\n      P[i]++;\n    }\n\n    // If the current palindrome extends past R, update C and R\n    if (i + P[i] > R) {\n      C = i;\n      R = i + P[i];\n    }\n\n    v('algo', {center: C, rightBoundary:R, \n                currentElementIdx: i, mirrorOfCurrentIdx:iMirror,\n                currentElement: modifiedStringArr[i], \n               mirrorElement: modifiedStringArr[iMirror] || ''\n              })\n\n    v('str', [modifiedStringArr, P]);\n  }\n\n   // Find the maximum element in P\n  let maxLen = 0;\n  let centerIndex = 0;\n  for (let i = 0; i < P.length; i++) {\n    if (P[i] > maxLen) {\n      maxLen = P[i];\n      centerIndex = i;\n    }\n  }\n  const originalStart = Math.floor((centerIndex - maxLen) / 2);\n  const result = s.substr(originalStart, maxLen);\n\n  const endTime = performance.now();\n  const executionTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);\n  v('result', result);\n  v('time', {executionTimeInSeconds})\n  return result;\n}",
            input: '"babad"'
          }
        ],
        snippetsListOpened: false
      },
      version: 0
    })
  );
}

interface SandyState {
  theme: 'light' | 'dark';
  snippets: CodeSnippet[];
  snippetsListOpened: boolean;
  currentSnippetId: string | null;
  toggleSnippetsList: () => void;
  setCurrentSnippetId: (snippetId: string | null) => void;
  saveSnippet: (snippet: CodeSnippet) => void;
  removeSnippet: (snippetId: string) => void;
}

interface CodeSnippet {
  id?: string;
  title: string;
  code: string;
  input: string;
  expectedOutput?: string;
}

export const useSandyStore = create<SandyState>()(
  persist(
    (set) => ({
      theme: 'light',
      currentSnippetId: null,
      snippets: [],
      snippetsListOpened: false,
      toggleSnippetsList: () => set((state) => ({ snippetsListOpened: !state.snippetsListOpened })),
      setCurrentSnippetId: (snippetId: string | null) => set({ currentSnippetId: snippetId }),
      saveSnippet: (snippet: CodeSnippet) =>
        set((state) => {
          const snippets = [...state.snippets];
          if (snippet.id) {
            const snippetIndex = state.snippets.findIndex((s) => s.id === snippet.id);
            snippets[snippetIndex] = snippet;
          } else {
            snippet.id = uuid();
            snippets.push(snippet);
          }
          return { snippets, currentSnippetId: snippet.id };
        }),
      removeSnippet: (snippetId: string) =>
        set((state) => ({ snippets: state.snippets.filter((snippet) => snippet.id !== snippetId) }))
    }),
    {
      name: 'sandy-store:n7m4v1'
    }
  )
);
