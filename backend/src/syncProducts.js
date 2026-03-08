import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { parse } from "csv-parse/sync";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function syncProducts(db) {
  try {
    const filePath = path.join(__dirname, "smartphone_cleaned_v5.csv");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const rows = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!rows.length) { console.log("No data found in CSV file."); return; }

    let inserted = 0, updated = 0;

    for (const row of rows) {
      const toBool = (val) => val === "1" || val === "true" || val === true || val === 1;
      const toNum = (val) => val !== "" && val != null ? Number(val) : null;

      const product = {
        brand: row["brand_name"] || null,
        name: row["model"] || null,
        category: "smartphones",
        price: toNum(row["price"]),
        rating: toNum(row["rating"]),
        specifications: {
          has_5g: toBool(row["has_5g"]),
          has_nfc: toBool(row["has_nfc"]),
          has_ir_blaster: toBool(row["has_ir_blaster"]),
          processor_brand: row["processor_brand"] || null,
          num_cores: toNum(row["num_cores"]),
          processor_speed: toNum(row["processor_speed"]),
          battery_capacity: toNum(row["battery_capacity"]),
          fast_charging_available: toBool(row["fast_charging_available"]),
          fast_charging: toNum(row["fast_charging"]),
          ram_capacity: toNum(row["ram_capacity"]),
          internal_memory: toNum(row["internal_memory"]),
          screen_size: toNum(row["screen_size"]),
          refresh_rate: toNum(row["refresh_rate"]),
          resolution: row["resolution"] ? String(row["resolution"]).replace(/\u202F/g, " ").trim() : null,
          num_rear_cameras: toNum(row["num_rear_cameras"]),
          num_front_cameras: toNum(row["num_front_cameras"]),
          os: row["os"] || null,
          primary_camera_rear: toNum(row["primary_camera_rear"]),
          primary_camera_front: toNum(row["primary_camera_front"]),
          extended_memory_available: toBool(row["extended_memory_available"]),
          extended_upto: toNum(row["extended_upto"]),
        },
        updatedAt: new Date(),
      };

      const result = await db.collection("products").updateOne(
        { brand: row["brand_name"], name: row["model"] },
        { $set: product, $setOnInsert: { createdAt: new Date() } },
        { upsert: true }
      );

      if (result.upsertedCount > 0) inserted++;
      else if (result.modifiedCount > 0) updated++;
    }

    console.log(`✅ Sync complete: ${inserted} inserted, ${updated} updated out of ${rows.length} total rows.`);
  } catch (error) {
    console.error("❌ Error syncing products from CSV:", error);
  }
}
