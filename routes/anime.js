const express = require('express')
const router = express.Router()
const Anime = require('../models/animemodel')

router.get('/', async (req, res) => {
  try {
    const anime = await Anime.find()
    res.json(anime)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', getAnime, (req, res) => {
  res.json(res.anime)
})

router.post('/', async (req, res) => {
  const anime = new Anime({
    name: req.body.name,
    numberEpisodes: req.body.numberEpisodes
  })
  try {
    const newAnime = await anime.save()
    res.status(201).json(newAnime)
  } catch(err) {
    res.status(400).json({ message: err.message})
  }
})

router.patch('/:id', getAnime, async (req, res) => {
  if (req.body.name != null) {
    res.anime.name = req.body.name
  }
  if (req.body.numberEpisodes != null) {
    res.anime.numberEpisodes = req.body.numberEpisodes
  }
  try {
    const updatedAnime = await res.anime.save()
    res.json(updatedAnime)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getAnime, async (req, res) => {
  try {
    await res.anime.remove()
    res.json({ message: 'Deleted Anime' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getAnime(req, res, next) {
  let anime
  try {
    anime = await Anime.findById(req.params.id)
    if (anime == null) {
      return res.status(404).json({ message: 'Cannot find Anime' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.anime = anime
  next()
}

module.exports = router