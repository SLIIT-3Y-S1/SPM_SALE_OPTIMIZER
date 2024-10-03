import { quantileSeq } from "mathjs";
import {AzureOpenAI} from "openai";

// Function to calculate outliers using the IQR method
export const calcOutliersIQR = (data: number[]) => {
    if (data.length === 0) return [];

    // Sort data
    const sortedData = [...data].sort((a, b) => a - b);

    // Calculate Q1 and Q3
    const Q1 = quantileSeq(sortedData, 0.25); // First quartile (25th percentile)
    const Q3 = quantileSeq(sortedData, 0.75); // Third quartile (75th percentile)

    // Calculate IQR
    const IQR = Q3 - Q1;

    // Define outliers as points outside the range [Q1 - 1.5 * IQR, Q3 + 1.5 * IQR]
    const lowerBound = Q1 - 1.5 * IQR;
    const upperBound = Q3 + 1.5 * IQR;

    // Filter data to find outliers
    const outliers = sortedData.filter((value) => value < lowerBound || value > upperBound);

    return outliers;
  }
