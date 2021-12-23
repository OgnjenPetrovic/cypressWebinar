
let faker = require('faker');

export const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const createUseCaseAPIContent = () => {
    const articleData = {
      article: {
      body: faker.commerce.productDescription(),
      description: faker.name.jobDescriptor(),
      title: faker.name.title(),
      tagList:[
        faker.random.word(4), faker.lorem.word(3)
      ]
    } 
    }
    return articleData;
};