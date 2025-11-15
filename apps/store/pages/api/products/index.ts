diff:apps/store/pages/api/products/index.ts
--- a/apps/store/pages/api/products/index.ts
+++ b/apps/store/pages/api/products/index.ts
@@ -1,5 +1,27 @@
 import type { NextApiRequest, NextApiResponse } from 'next'
+import { Product } from '@/models/Product'
+import dbConnect from '@/lib/dbConnect'
+
+type ProductData = {
+  sku: string
+  title: string
+  // Other risn-generated fields
+}
 
 export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
 ) {
+  await dbConnect()
+
+  if (req.method === 'POST') {
+    try {
+      const productData: ProductData = req.body
+      const newProduct = await Product.create(productData)
+      return res.status(201).json(newProduct)
+    } catch (error) {
+      return res.status(500).json({ error: 'Product creation failed' })
+    }
+  }
+
+  return res.status(405).end()
 }
