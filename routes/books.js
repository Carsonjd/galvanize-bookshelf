'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex.js')
const { camelizeKeys, decamelizeKeys } = require('humps');

router.get('/books', (_req, res, next) => {
  knex('books')
    .orderBy('title', 'ASC')
    .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
    .then(books => {res.send(books)})
    .catch(err => {next(err)})
});


router.get('/books/:id', (req,res,next) => {
  let id = req.params.id
  knex('books')
    .orderBy('title', 'ASC')
    .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt').where('id', id)
    .then(([book]) => {res.send(book)})
    .catch(err => next(err))
})

router.post('/books', (req,res,next) => {
  const {title, author, genre, description, coverUrl} = req.body
  knex('books').insert({
    title:title, author:author, genre:genre, description:description, cover_url:coverUrl
  }, '*')
  .then(([book]) => res.send(camelizeKeys(book)))
  .catch(err => {next(err)})
})

router.patch('/books/:id', (req,res,next) => {
  const {title, author, genre, description, coverUrl} = req.body
  knex('books').where('id', req.params.id).update({
    title:title, author:author, genre:genre, description:description, cover_url:coverUrl
  }, '*')
  .then(([book]) => res.send(camelizeKeys(book)))
  .catch(err => {next(err)})
})

router.delete('/books/:id', (req,res,next) => {
  knex('books')
    .where('id', req.params.id)
    .del()
    .first()
    .then(book => {
      const {author, cover_url, description, genre, title} = book
      res.send(
      {
        author:author, coverUrl:cover_url, description:description, genre:genre, title:title
      }
    )})
    .catch(err => next(err))
})

module.exports = router;
