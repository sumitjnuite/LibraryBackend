import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
    slotName: {
        type: String,
        required: [true, 'Slot name is required'],
        unique: true
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
    }
}, {
    timestamps: true, // Creates createdAt and updatedAt automatically
});

const Slot = mongoose.model('Slot', slotSchema);
export default Slot;

const slot1 = new Slot({
    slotName: 'SLOT1',
    startTime: '07:00',
    endTime: '13:00'
});

const slot2 = new Slot({
    slotName: 'SLOT2',
    startTime: '13:00',
    endTime: '19:00'
});

const slot3 = new Slot({
    slotName: 'SLOT3',
    startTime: '19:00',
    endTime: '12:00'
});

export const initializeSlots = async () => {
    const slots = [slot1, slot2, slot3];
    for (const slot of slots) {
        const existingSlot = await Slot.findOne({ slotName: slot.slotName });
        if (!existingSlot) {
            await slot.save();
            console.log(`Initialized slot: ${slot.slotName}`);
        }
    }
};

