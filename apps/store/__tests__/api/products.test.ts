diff:apps/store/__tests__/api/products.test.ts
--- /dev/null
+++ b/apps/store/__tests__/api/products.test.ts
@@ -0,0 +1,38 @@
+import { createMocks } from 'node-mocks-http'
+import handler from '@/pages/api/products/index'
+import dbConnect from '@/lib/dbConnect'
+import Product from '@/models/Product'
+
+jest.mock('@/lib/dbConnect', () => jest.fn())
+
+describe('/api/products', () => {
+  beforeAll(async () => {
+    await dbConnect()
+  })
+
+  it('creates product via POST', async () => {
+    const { req, res } = createMocks({
+      method: 'POST',
+      body: {
+        sku: 'TEST123',
+        title: 'Test Product'
+      }
+    })
+
+    await handler(req, res)
+
+    expect(res._getStatusCode()).toBe(201)
+    expect(JSON.parse(res._getData())).toMatchObject({
+      sku: 'TEST123',
+      title: 'Test Product'
+    })
+  })
+})
