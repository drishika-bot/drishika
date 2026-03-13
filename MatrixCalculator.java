import java.util.Scanner;

public class MatrixCalculator {
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("--- Matrix Calculator ---");
        System.out.println("1. Matrix Addition");
        System.out.println("2. Matrix Multiplication");
        System.out.print("Choose an option: ");
        int choice = scanner.nextInt();

        System.out.print("Enter number of rows: ");
        int rows = scanner.nextInt();
        System.out.print("Enter number of columns: ");
        int cols = scanner.nextInt();

        int[][] matrixA = readMatrix(rows, cols, "A");
        int[][] matrixB = readMatrix(rows, cols, "B");

        switch (choice) {
            case 1:
                int[][] sum = addMatrices(matrixA, matrixB, rows, cols);
                System.out.println("Result of Addition:");
                printMatrix(sum, rows, cols);
                break;
            case 2:
                // For multiplication, cols of A must equal rows of B. 
                // For simplicity in this basic version, we assume square matrices or compatible dimensions.
                System.out.print("Enter columns for Matrix B (for multiplication): ");
                int colsB = scanner.nextInt();
                int[][] matrixB_mult = readMatrix(cols, colsB, "B");
                int[][] product = multiplyMatrices(matrixA, matrixB_mult, rows, cols, colsB);
                System.out.println("Result of Multiplication:");
                printMatrix(product, rows, colsB);
                break;
            default:
                System.out.println("Invalid choice.");
        }
    }

    private static int[][] readMatrix(int rows, int cols, String name) {
        int[][] matrix = new int[rows][cols];
        System.out.println("Enter elements for Matrix " + name + ":");
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix[i][j] = scanner.nextInt();
            }
        }
        return matrix;
    }

    private static int[][] addMatrices(int[][] a, int[][] b, int r, int c) {
        int[][] result = new int[r][c];
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
        return result;
    }

    private static int[][] multiplyMatrices(int[][] a, int[][] b, int r1, int c1, int c2) {
        int[][] result = new int[r1][c2];
        for (int i = 0; i < r1; i++) {
            for (int j = 0; j < c2; j++) {
                for (int k = 0; k < c1; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    }

    private static void printMatrix(int[][] matrix, int r, int c) {
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}
