const db = require('../models');

const { Place } = db;

module.exports = {
  addPlace: (data) => {
    const {
      city_id: cityId,
      user_id: userId,
      name,
      description,
      rooms,
      bathrooms,
      max_guests: maxGuests,
      price_by_night: priceByNight,
    } = data;

    return Place.create({
      city_id: cityId,
      user_id: userId,
      name,
      description,
      rooms,
      bathrooms,
      max_guests: maxGuests,
      price_by_night: priceByNight,
    });
  },

  getPlaceById: (placeId) => {
    return Place.findByPk(placeId);
  },

  getAllPlaces: () => {
    return Place.findAll();
  },
};
