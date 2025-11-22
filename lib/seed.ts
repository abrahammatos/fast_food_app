import { ID } from "react-native-appwrite";
import { appwriteConfig, storage, tablesDB } from "./appwrite";
import dummyData from "./data";

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[]; // list of customization names
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function clearAll(tableId: string): Promise<void> {
  const list = await tablesDB.listRows({
    databaseId: appwriteConfig.databaseId,
    tableId: tableId,
  });

  await Promise.all(
    list.rows.map((doc) =>
      tablesDB.deleteRow({
        databaseId: appwriteConfig.databaseId,
        tableId: tableId,
        rowId: doc.$id,
      })
    )
  );
}
async function clearStorage(): Promise<void> {
  const list = await storage.listFiles({
    bucketId: appwriteConfig.bucketId,
  });

  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile({
        bucketId: appwriteConfig.bucketId,
        fileId: file.$id,
      })
    )
  );
}

async function uploadImageToStorage(imageUrl: string) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const fileObj = {
    name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
    type: blob.type,
    size: blob.size,
    uri: imageUrl,
  };

  console.log("PRIMEIRO", fileObj);
  console.log("BUCKETID", appwriteConfig.bucketId);

  const file = await storage.createFile({
    bucketId: appwriteConfig.bucketId,
    fileId: ID.unique(),
    file: {
      name: fileObj.name,
      type: "image/jpeg",
      size: fileObj.size,
      uri: fileObj.uri,
    },
  });

  console.log("SEGUNDO", file);

  return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
}

async function seed(): Promise<void> {
  console.log("⏳ Iniciando seed...");

  // 1. Clear all
  await clearAll(appwriteConfig.categoriesTableId);
  await clearAll(appwriteConfig.customizationsTableId);
  await clearAll(appwriteConfig.menuTableId);
  await clearAll(appwriteConfig.menuCustomizationsTableId);
  await clearStorage();

  // 2. Create Categories
  console.log("⏳ Categories");

  const categoryMap: Record<string, string> = {};
  for (const cat of data.categories) {
    const doc = await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.categoriesTableId,
      rowId: ID.unique(),
      data: cat,
    });
    categoryMap[cat.name] = doc.$id;
  }

  // 3. Create Customizations
  console.log("⏳ Customizations");

  const customizationMap: Record<string, string> = {};
  for (const cus of data.customizations) {
    const doc = await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.customizationsTableId,
      rowId: ID.unique(),
      data: {
        name: cus.name,
        price: cus.price,
        type: cus.type,
      },
    });
    customizationMap[cus.name] = doc.$id;
  }

  // 4. Create Menu Items
  console.log("⏳ Menu items");

  const menuMap: Record<string, string> = {};
  for (const item of data.menu) {
    console.log("items: ", item.image_url);

    const uploadedImage = await uploadImageToStorage(item.image_url);

    console.log("TERCEIRO", uploadedImage);

    const doc = await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.menuTableId,
      rowId: ID.unique(),
      data: {
        name: item.name,
        description: item.description,
        image_url: uploadedImage,
        price: item.price,
        rating: item.rating,
        calories: item.calories,
        protein: item.protein,
        categories: categoryMap[item.category_name],
      },
    });

    menuMap[item.name] = doc.$id;

    // 5. Create menu_customizations
    console.log("⏳ Menu customizations");

    for (const cusName of item.customizations) {
      await tablesDB.createRow({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.menuCustomizationsTableId,
        rowId: ID.unique(),
        data: {
          menu: doc.$id,
          customizations: customizationMap[cusName],
        },
      });
    }
  }

  console.log("✅ Seeding complete.");
}

export default seed;
