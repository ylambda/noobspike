from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, UnicodeText
from sqlalchemy.orm import relationship
from .database import Base

class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String(50), unique=True)
    created = Column(DateTime)
    domain = Column(String(50))
    author = relationship("User", backref="video_set")
    upvotes = Column(Integer)
    downvotes = Column(Integer)
    thing_id = Column(String(10), unique=True)
    url = Column(UnicodeText)
    source_webm = Column(UnicodeText)
    source_mp4 = Column(UnicodeText)
    thumbnail = Column(UnicodeText)
    small_thumbnail = Column(UnicodeText)
    video_id = Column(String(255))

    def __init__(self, title=None):
        self.title = None

    def __repr__(self):
        return "%r" % self.title

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    video_set = Column(Integer, ForeignKey("videos.id"))

    def __init__(self, username=None):
        self.username = self.username

    def __repr__(self):
        return "%r" % self.username
