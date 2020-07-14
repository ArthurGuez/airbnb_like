const { v4: uuidv4 } = require('uuid');

const db = require('../models');

const { Booking, User, Place, City } = db;

module.exports = {
  addBooking: async (request) => {
    const { place_id: placeId, check_in: checkIn, check_out: checkOut } = request.body;
    const { userId } = request.user;

    const newBooking = await Booking.create({
      id: uuidv4(),
      place_id: placeId,
      user_id: userId,
      check_in: checkIn,
      check_out: checkOut,
    });

    const confirmedBooking = await Booking.findByPk(newBooking.id, {
      attributes: ['id', 'check_in', 'check_out'],
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name', 'email'],
        },
        {
          model: Place,
          attributes: [
            'id',
            'name',
            'description',
            'rooms',
            'bathrooms',
            'max_guests',
            'price_by_night',
          ],
          include: [
            {
              model: City,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    return confirmedBooking;
  },

  getBookingsTourist: async (request) => {
    const { userId } = request.user;
    const bookingsFound = await Booking.findAll({
      attributes: ['id', 'check_in', 'check_out'],
      where: {
        user_id: userId,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name', 'email'],
        },
        {
          model: Place,
          attributes: [
            'id',
            'name',
            'description',
            'rooms',
            'bathrooms',
            'max_guests',
            'price_by_night',
          ],
          include: [
            {
              model: City,
              attributes: ['name'],
            },
          ],
        },
      ],
      order: [['check_in', 'DESC']],
    });

    return bookingsFound;
  },

  rechercherBookingId: (id) => {
    return Booking.findByPk(id);
  },

  deleteBooking: (bookingId) => {
    return Booking.destroy({
      where: {
        id: bookingId,
      },
    });
  },

  getBookingsPlaceId: async (placeId) => {
    const bookingsPlaceId = await Booking.findAll({
      attributes: ['id', 'check_in', 'check_out'],
      where: {
        place_id: placeId,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name', 'email'],
        },
      ],
      order: [['id', 'ASC']],
    });

    return bookingsPlaceId;
  },

  getBookingsHost: async (request) => {
    const { userId } = request.user;
    const bookingsFound = await Place.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'rooms',
        'bathrooms',
        'max_guests',
        'price_by_night',
      ],
      where: {
        user_id: userId,
      },
      include: [
        {
          model: City,
          attributes: ['name'],
        },
        {
          model: Booking,
          attributes: ['id', 'check_in', 'check_out'],
          include: [
            {
              model: User,
              attributes: ['id', 'first_name', 'last_name', 'email'],
            },
          ],
        },
      ],
    });

    return bookingsFound;
  },
};
