class ChatMessageFormatAutocivSelf
{
    parse(msg)
    {
        if (!msg.text)
            return "";

        return { "text": setStringTags(`System == ${msg.text}`, { "font": "sans-stroke-16" }) };
    }
}
