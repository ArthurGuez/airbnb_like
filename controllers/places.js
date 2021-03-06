const db = require('../models');

const { Place, City } = db;

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

  updatePlace: async (data, placeId) => {
    const placeFound = await Place.findByPk(placeId, {
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
    });
    if (!placeFound) {
      return placeFound;
    }
    return placeFound.update(data);
  },

  deletePlace: async (placeId) => {
    return Place.destroy({
      where: {
        id: placeId,
      },
    });
  },

  getPlaceById: (placeId) => {
    return Place.findByPk(placeId, {
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
    });
  },

  getPlacesByCity: (cityId) => {
    return Place.findAll({
      where: {
        city_id: cityId,
      },
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
    });
  },

  getPlaces: () => {
    return Place.findAll({
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
      attributes: [
        'id',
        'name',
        'description',
        'rooms',
        'bathrooms',
        'max_guests',
        'price_by_night',
        'image',
      ],
    });
  },
};
