import { Injectable } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';
import { v4 as uuidv4 } from 'uuid';
import { UpdateRecipeInput } from './dto/update-recipe.input';

@Injectable()
export class RecipesService {
  private listReceipt: Recipe[] = [
    {
      id: uuidv4(),
      title: 'cfj1',
      description: 'Test NestJs 1',
      creationDate: new Date(),
      ingredients: ['a', 'b', 'c'],
    },
    {
      id: uuidv4(),
      title: 'cfj2',
      description: 'Test NestJs 2',
      creationDate: new Date(),
      ingredients: ['d', 'e', 'f'],
    },
    {
      id: uuidv4(),
      title: 'cfj3',
      description: 'Test NestJs 3',
      creationDate: new Date(),
      ingredients: ['d', 'e', 'f'],
    },
    {
      id: uuidv4(),
      title: 'cfj4',
      description: 'Test NestJs 4',
      creationDate: new Date(),
      ingredients: ['d', 'e', 'f'],
    },
  ];

  async create(data: NewRecipeInput): Promise<Recipe> {
    const newRecipe: Recipe = {
      id: uuidv4(),
      ...data,
      creationDate: new Date(),
    };

    this.listReceipt.push(newRecipe);

    return newRecipe;
  }

  async update(updateData: UpdateRecipeInput): Promise<Recipe> {
    const updatedRecipe = this.listReceipt.find(
      ele => ele.id === updateData.id,
    );

    Object.assign(updatedRecipe, updateData);

    return updatedRecipe;
  }

  async findOneById(id: string): Promise<Recipe> {
    return this.listReceipt.find(el => el.id === id);
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.listReceipt.slice(
      recipesArgs.skip,
      recipesArgs.take,
    ) as Recipe[];
  }

  async remove(id: string): Promise<boolean> {
    const recipeToRemoveIdx = this.listReceipt.findIndex(el => el.id === id);
    this.listReceipt.splice(recipeToRemoveIdx, 1);
    return true;
  }
}
