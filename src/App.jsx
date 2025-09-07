import { useState, useEffect } from 'react'
import { marked } from 'marked'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import './App.css'

function App() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Marked設定
    marked.setOptions({
      highlight: function(code, lang) {
        if (Prism.languages[lang]) {
          return Prism.highlight(code, Prism.languages[lang], lang)
        } else {
          return code
        }
      },
      breaks: true,
      gfm: true
    })

    // main.mdファイルを取得してパースする
    const loadMarkdown = async () => {
      try {
        const response = await fetch('./main.md')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const markdown = await response.text()
        const html = marked.parse(markdown)
        setContent(html)
        setLoading(false)
        
        // コードハイライトを適用（次のレンダリング後）
        setTimeout(() => {
          Prism.highlightAll()
        }, 0)
      } catch (err) {
        console.error('Error loading markdown:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    loadMarkdown()
  }, [])

  if (loading) {
    return (
      <div className="container">
        <Header />
        <main>
          <div className="markdown-content">
            <div className="loading">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <Header />
        <main>
          <div className="markdown-content">
            <div className="error">
              <h2>Error Loading Content</h2>
              <p>Could not load main.md file. Please make sure it exists.</p>
              <p>Error: {error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="container">
      <Header />
      <main>
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header>
      <nav>
        <h1>WatchMe</h1>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <p>WatchMe</p>
    </footer>
  )
}

export default App