import Layout from "app/layouts/Layout"
import { Button, KIND, SIZE } from "baseui/button"
import { Paragraph2 } from "baseui/typography"
import { BlitzPage } from "blitz"
import React from "react"

import { motion } from "framer-motion"
import { Frame } from "framer"

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <h1>React - Playlist - Generator</h1>

        <Button kind={KIND.primary} size={SIZE.default}>
          Hello World
        </Button>
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          HELLO WORLD{" "}
        </motion.div>
      </main>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
