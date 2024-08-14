from pymongo import MongoClient

# Step 1: Connect to MongoDB
client = MongoClient("mongodb+srv://shareallmedia69:LOdPb5Hm46gGhMv9@cluster.pa042.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")  # Replace with your MongoDB connection string


try:
    # Attempt to retrieve server information to check connection
    client.server_info()
    print("Connected to MongoDB!")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")

# Step 2: Select the database
db = client["intruderHistory"]  # Replace with your database name

# Step 3: Select the collection
collection = db["History"]  # Replace with your collection name

# Step 4: Insert data (single document)
data = {
    "time": "1723631472",
    "message": "Motion Detected",
}
result = collection.insert_one(data)
print(f"Inserted document with id: {result.inserted_id}")
