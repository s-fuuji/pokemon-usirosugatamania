module.exports = {
  mode:"jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'quiz-back': "url('https://game.watch.impress.co.jp/img/gmw/list/1344/820/1.jpg')",
        'card-back': "url('https://lohas.nicoseiga.jp/thumb/1175315i?')",
    },
  },
  plugins: [],
}
}