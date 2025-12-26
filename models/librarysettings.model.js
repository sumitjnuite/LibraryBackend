const librarysettingsSchema = new mongoose.Schema({
    libraryName: {
        type: String,
        required: true,
        maxlength: [100, 'Library name cannot exceed 100 characters']
    },
    address: {
        type: String,
        required: true,
        maxlength: [200, 'Address cannot exceed 200 characters']
    },
    contactEmail: [String],
    contactPhone: [Number],
    openingHours: {
        open: {
            type: String,
            required: true
        },
        close: {
            type: String,
            required: true
        }
    },
});

export const LibrarySettings = mongoose.model('LibrarySettings', librarysettingsSchema);