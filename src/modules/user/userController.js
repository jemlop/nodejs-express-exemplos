import { Router } from 'express'

import { signup, login } from './userService'

const AUTH_COOKIE_NAME = 'authorization'

const router = Router()
router.post('/signup', (req, res) => {
  try {
    const token = signup(req.body)
    res.cookie(AUTH_COOKIE_NAME, token).status(201).send()
  } catch (err) {
    if (err.message === 'email_existente')
    return res.status(400).send(err.message)
    
    res.status(500).send(err.message)
  }
})

router.post('/login', (req, res) => {
  try {
    const token = login(req.body)
    res.cookie(AUTH_COOKIE_NAME, token).status(200).send()
  } catch (err) {
    if (err.massage === 'email_nao_encontrado' || err.massage === 'senha_incorreta')
      return res.status(400).send(err.massage)

    res.status(500).send()  
  }
})

export default router 