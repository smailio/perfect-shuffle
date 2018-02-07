import React from 'react';

const Card = ({ isSelected, isHidden, cardCount }) => (
  <div
    className={isSelected ? 'card' : 'card'}
    style={{
      margin: '6px 6px 6px 6px'
    }}
  >
    <div
      className="face front"
      style={{
        display: 'grid',
        gridTemplateColumns: '10px auto 10px',
        gridTemplateRows: '10px auto 10px',
        width: cardCount <= 50 ? '7vh' : '4.5vh',
        height: cardCount <= 50 ? '14vh' : '9vh',
        borderColor: isSelected ? '#EF4836' : undefined,
        visibility: isHidden ? 'hidden' : 'visible',
        lineHeight: '10px'
      }}
    >
      <img
        style={{ display: 'block' }}
        height={'10'}
        width={'10'}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALISURBVGhD7ZjPi9NAFMcrHkTBkygKHrwoHgTxF3qRlZ0kjfgDxC2bSVq2m5l09eDBv2LRmx5E716EFT0p/hO7qLieRMQfFH/jD1wRur7ZvK4leSxNmkxTyQe+0GbevPed6SSZTqWkpKTk/4U5/inTDU7i19HCrF/YZnDx2uTilT0xvRUvjwZVL9hhuvIxaFkJBrIwVpvajs3FxuKtvYYrXnbNr4rLFwaf2Y1hxcT05DnDlZ9i5rvi8iMsqTMYXhyOTVzeCAZvxAzT6hhcXrPtSxuw+3Ax6/4+MPSUMLqm1H2hlhumGQ6Mi4uwLH5RBvsRDPyH5fk+ptPHWd/fbLpijjKVRnDT3z7dam3C9PnCJuUemPVnlJEBNV+dnNmFZfIBfvIqzPxXonhGEh8MHoxhuWxhPDgPj8jfdOHsBDf3T+YIG8tmg+nIcR3mu1KDMJ3gKJYfjJVtgXoBEYVyVjuTPRS8Oe8TyTVJ3EEb6WBecIROrE0dqz69H+0kB2bgOpFUq9S2A+0kBxIsRhPqltqmoJ3kQOdvVFKdUh7QTnJgCX2nkurUQAOAPcpzKqlmLaKd5MAL5RaRUKvgBXoT7SSHeeIElVSnqp48jnbSAWvwEZVYh2AFPEAb6bE9uRN+xvdUgZz1VtVGG4NhOP5hlTBSYG1x8a77GWZy9XNf4uKN5cpDWD4bcFN3Fwp0YgV7pE4lmBNMwRNs6d81sTTuyqZq640lBLnFXK5nSDCQg2DoKszqQri0xB+c4YcWl546obAcYUaMLTM3MFSb4foNFRv2gb7h8pyHe+0Kc/wDWGa4UHsoMJh+T6OTlTMiLr/EByA+qzYMKy5gthk136MmhhWTWq22Hp4gTwjjoaBNxWB48QCTImY6oqEcZPUDazS2gMF21DChtorFboVhXZL/zvDovKf6hF0LAJiajZrsQ7PYvaSkpGRkqVT+AuXizLVSkdOYAAAAAElFTkSuQmCC"
      />
      <div>&nbsp;</div>
      <img
        height="8"
        width="8"
        src="https://png.icons8.com/color/50/000000/filled-like.png"
      />
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <img
        height="10"
        width="10"
        src="https://png.icons8.com/color/50/000000/diamonds.png"
      />
      <div>&nbsp;</div>
      <img
        height={'10'}
        width={'10'}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPfSURBVGhD7VjfixVVHL+bRShRz0VKgQ+FiLZLraKx4p2Ze7FFU7rtnJlN9J4zs6AWqQ+CiPsQCD4JS4L6B/Tgk5YsYkkvQUS09RIFPQVRaKCm7vojUD/fud+7zb33u/fO7G29szgf+DD3zvl+v+fzPXPO95yZQo4cOXLkGB8ff6ro6rLt6QlL6S+I9JvuURubZRuOZwYsZX6yPfNwDk6V/KCfzbMJ2zWbMfIzgvgG4glNky27ZQtl37yMJG5IwiUimWuWW32J3bMDW+kzkuB2RDKn2T0bKJc/fBbr4h9JbHvqGwNh+AyH6T2KbvUNWWhnOqO713CY3qO2yGWhHZmlRW99EK4QRSagM7JrOYfJBrBGfpOEtiP5sHt2YHn6oCS2HS3ffMzu2YFVCV9AFfpbEizR8szVsu8/z+6PF1QqrRH9uqP0W5II7Av7JNEilR5jt1lQTIpNfSxIWaYdGCN4ylbmekzMA8zxb2wVuEND40+THV2RzI8xG5Gw+aHuEw2Oa1QUCzFjNteoT5zLXiS7rkHlkYLWO5AIEb/avtlO9rU9Rf8r2UVU+j6ua6PY8OlUJKK+uy3RdEpFoGmpA4mwnaRSjOtRqZ15pDQy9gqSvSi0iWQNUfKpQe8NGK12x3GR8LmJo3yIKna5pV2Zr2w/GEMSt1raOnMKsvpq6lIAgkpCsMTEKJ7Dwr0y+9/TVzDnP4/bpKXjapvlJQdGbUIKloZI5i/p97yp9AmWlxzdjt6CUOnzLC854HihJVDveYHlJQfm9EkhUCpincXXSOJdfy5ien7K8pLD8oOtUrCkxNS8tMndPVj/v/n9Xf1R1YrZpCUS2cLykiPapT39ixSwHZHAPTyJQ9EnIVVdX79f9IM3uaQfJpu4TyIq83OlUlnC8tKh5Ju3U3Wq9Lcl16xi90JRmZ31tqKnPb5dKHrBasT9rsG3DWsa9AZ2nx/wVHYgSNtPPHjkfzp+tdr88Q2jfyxm8wnfjkC25EO+8VjNRIzbjqq+y27dwVHhawh6tvnp8NTbO1TZ8xybNgDT4etZe6W/5NsNIF8ks695GuP/XVzPOqN6JZv+f6BjtqXCjTgYvmOPmlf5toh17+1fymJYnJ6hry3cLIJiUmzqo2fvKs3AOrD+S6LGoq83cfPiAeb28eZEaM1w8+IAlW6siT+aE8G93+ddQnuBome2tSTBxBF/mM2yDyzsOV+aUKEm2SzbsFQwJCXQyC43t8eAPgj9vlV4I2lXJ9uaSwaBDfCAJFym/ojdsgXbDQYbN8AOVOYOfcNi92xgOAyXYYQ/o2NIKsKHfDlMjhw5cjwxKBQeAQKasE5iAQLeAAAAAElFTkSuQmCC"
      />
    </div>
  </div>
);

export default Card;
