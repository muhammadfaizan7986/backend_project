import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export async function paginationViaAggregate<T>(
  model: Model<T>,
  aggregatePipeline: any[] = [], // Aggregation pipeline to execute
  paginationDto: PaginationDto,
  populateFields: any[] = [], // Fields to populate after aggregation
): Promise<{
  data: T[];
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
}> {
  const { page = 1, limit = 10, sort = { createdAt: -1 } } = paginationDto;
  const skip = (page - 1) * limit;

  // Aggregation pipeline to get data with pagination
  const dataPipeline = [
    ...aggregatePipeline,
    { $sort: sort }, // Sort data
    { $skip: skip }, // Skip for pagination
    { $limit: limit }, // Limit for pagination
  ];

  // Aggregation pipeline to count total documents matching the query
  const countPipeline = [...aggregatePipeline, { $count: 'totalCount' }];

  // Execute aggregation pipelines concurrently
  const [data, countResult] = await Promise.all([
    model.aggregate(dataPipeline).exec(),
    model.aggregate(countPipeline).exec(),
  ]);

  const totalCount = countResult[0]?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  // Populate the data after aggregation if required
  const populatedData = await model.populate(data, populateFields);

  return {
    data: populatedData,
    totalCount,
    totalPages,
    page,
    limit,
  };
}
