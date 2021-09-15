import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'
import { Product } from '../entities/Product'

@InputType()
class NewProduct implements Partial<Product> {
  @Field()
  name: string
  @Field()
  description: string
  @Field(() => Int)
  price: number
}

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    const products = await Product.find()
    return products
  }

  @Mutation(() => Product)
  async addProduct(@Arg('data') newProductDetails: NewProduct) {
    const newProduct = await Product.create(newProductDetails)
    await Product.insert(newProduct)
    return newProduct
  }
}
