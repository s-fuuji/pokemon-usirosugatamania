module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,tsx,tsx}',
    './src/components/**/*.{js,ts,tsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'quiz-back':
          "url('https://www.bannerkoubou.com/image/cLqwOKV7tSNMBwj1656067722_1656067748.jpg')",
        'card-back': "url('https://lohas.nicoseiga.jp/thumb/1175315i?')",
      },
      colors: {
        'dark-orange': '#c86c05',
        'dark-red': '#bf1111',
      },
    },
    plugins: [],
  },
}
