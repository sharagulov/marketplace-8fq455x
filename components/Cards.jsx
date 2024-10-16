"use client";

import { useState, useEffect } from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import { Input } from './ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Highlighter from "react-highlight-words";

const ITEMS_PER_PAGE = 10; // количество карточек на странице

export default function Cards() {
  const [cardsData, setCatdsData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCards, setTotalCards] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    fetchCards(1);
  }, []);

  const fetchCards = (page) => {
    fetch(`../data.json?page=${page}&limit=${ITEMS_PER_PAGE}`)
      .then(response => response.json())
      .then(data => setCatdsData(data))
      .catch(error => console.error("Error loading the JSON data:", error))
  }

  const handleLoadMore = () => {
    setTotalCards(totalCards + ITEMS_PER_PAGE);
    fetchCards(Math.ceil(totalCards / ITEMS_PER_PAGE) + 1);
  }

  const toggleFavourite = (cardId) => {
    if (favourites.includes(cardId)) {
      setFavourites(favourites.filter(id => id !== cardId));
    } else {
      setFavourites([...favourites, cardId]);
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredCards = showFavourites
    ? cardsData.filter(card => favourites.includes(card.id) && (card.title.toLowerCase().includes(searchTerm.toLowerCase()) || card.description.toLowerCase().includes(searchTerm.toLowerCase())))
    : cardsData.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()) || card.description.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderedCards = filteredCards.slice(0, totalCards);

  return (
    <div>
      <div className="flex flex-col gap-3 mb-3">
        <div className="flex gap-3">
          <div className="content-center">
            <MagnifyingGlassIcon />
          </div>
          <Input value={searchTerm} onChange={handleSearch} placeholder="Find anything" />
        </div>
      </div>
      <div className="flex mb-10 flex-row gap-3">
        <div>
          <Button className={showFavourites ? "" : "bg-muted text-foreground"} onClick={() => setShowFavourites(false)} variant="plain">All</Button>
        </div>
        <div>
          <Button className={showFavourites ? "bg-muted text-foreground" : ""} onClick={() => setShowFavourites(true)} variant="plain">Favourites</Button>
        </div>
      </div>
      <div className="grid anima gap-7 grid-cols-1">
        {renderedCards.map((card) => (
          <div key={card.id} className="h-[300px] sm:h-[200px] bg-muted p-10 rounded-lg">
            <div className='flex gap-10 h-full'>
              <div className='flex flex-col justify-between min-w-[100px]'>
                <div className='grid gap-3 grid-cols-4'>
                  {Array.from({ length: card.blocksCount }, (_, index) => (
                    <div key={index} className='bg-accent rounded w-full h-4'></div>
                  ))}
                </div>
                <div className="text-center">
                  <p className='text-xs'>{card.blocksCount} {card.blocksCount > 1 ? `BLOCKS` : `BLOCK`}</p>
                </div>
              </div>
              <div className='flex flex-col sm:gap-3 gap-0 sm:flex-row justify-between w-full'>
                <div className='max-h-[120px] overflow-scroll sm:overflow-auto'>
                  <p className='text-xl mb-2'><Highlighter
                    highlightClassName="bg-accent"
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={card.title}
                  /></p>
                  <p className='text-sm'><Highlighter
                    highlightClassName="bg-accent"
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={card.description}
                  /></p>
                </div>
                <div className='flex gap-2 min-w-[160px] max-w-[150px] flex-col'>
                  <Button size="sm" variant="violet">Details</Button>
                  <Button className={favourites.includes(card.id) ? "text-white bg-accent" : ""} size="sm" onClick={() => { toggleFavourite(card.id) }} variant="violet"> {favourites.includes(card.id) ? 'In Favourites' : 'Add to Favourites'}</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {renderedCards.length ? <div className="flex justify-center my-10">
        <Button variant="plain" onClick={handleLoadMore}>Load More</Button>
      </div> : <div></div>}

    </div>
  )
}