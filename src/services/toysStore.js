import defaultToys from './mockToys.json';
import { createPersistentStore } from './createStore';
import { createObjectId } from './storage';

export const AGE_OPTIONS = ['0+', '1+', '2+', '3+', '4+', '5+', '6+', '8+', '10+'];

export const ILLUSTRATIONS = [
  '/toys/teddy.svg', '/toys/bunny.svg', '/toys/rocket.svg', '/toys/blocks.svg', '/toys/car.svg',
  '/toys/train.svg', '/toys/pyramid.svg', '/toys/xylophone.svg', '/toys/puzzle.svg', '/toys/robot.svg',
  '/toys/ball.svg', '/toys/kite.svg', '/toys/gift.svg',
];

const isValid = (value) =>
  Array.isArray(value) && value.every((toy) => toy && typeof toy._id === 'string' && toy.name && typeof toy.price === 'number');

export const toysStore = createPersistentStore({
  key: 'junior-toys',
  seed: () => structuredClone(defaultToys),
  isValid,
});

export function addToy(data) {
  const toy = {
    _id: createObjectId(),
    ...data,
    inStock: true,
    createdAt: new Date().toISOString(),
    __v: 0,
  };
  toysStore.set((toys) => [toy, ...toys]);
  return toy;
}

export function updateToy(id, data) {
  toysStore.set((toys) =>
    toys.map((toy) => (toy._id === id ? { ...toy, ...data, updatedAt: new Date().toISOString(), __v: (toy.__v ?? 0) + 1 } : toy)),
  );
}

export function deleteToy(id) {
  toysStore.set((toys) => toys.filter((toy) => toy._id !== id));
}

export const resetToys = () => toysStore.reset();
